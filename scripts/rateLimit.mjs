// Rate limiters for the serverless API. Uses Upstash Redis when configured
// (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) for a durable, distributed
// sliding window shared across every serverless instance. Falls back to a
// best-effort in-memory window (per warm instance) when Upstash is not set, so
// the endpoint always has some protection and never fails to load.
//
// createRateLimiter() builds one limiter per route (each with its own Redis key
// prefix and budget); isRateLimited() is the assessment form's limiter.

let redisPromise = null; // memoised { Ratelimit, redis } (or null)

async function getUpstash() {
  if (redisPromise) return redisPromise;
  redisPromise = (async () => {
    const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;
    if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) return null;
    try {
      const [{ Ratelimit }, { Redis }] = await Promise.all([
        import("@upstash/ratelimit"),
        import("@upstash/redis"),
      ]);
      return { Ratelimit, redis: Redis.fromEnv() };
    } catch {
      return null; // never let limiter setup take down the endpoint
    }
  })();
  return redisPromise;
}

// window is an Upstash duration string ("10 m"); windowMs mirrors it for the
// in-memory fallback.
export function createRateLimiter({ prefix, max, window = "10 m", windowMs = 10 * 60 * 1000 }) {
  let limiterPromise = null;
  const hits = new Map();

  const memLimited = (key, now) => {
    const arr = (hits.get(key) || []).filter((t) => now - t < windowMs);
    arr.push(now);
    hits.set(key, arr);
    if (hits.size > 5000) hits.clear(); // bound memory
    return arr.length > max;
  };

  const getLimiter = () => {
    if (!limiterPromise) {
      limiterPromise = getUpstash().then((u) =>
        u
          ? new u.Ratelimit({ redis: u.redis, limiter: u.Ratelimit.slidingWindow(max, window), prefix, analytics: false })
          : null
      );
    }
    return limiterPromise;
  };

  // Returns true when the caller has exceeded the limit and should be blocked.
  return async function isLimited(ip) {
    const key = ip || "unknown";
    const limiter = await getLimiter();
    if (limiter) {
      try {
        const { success } = await limiter.limit(key);
        return !success;
      } catch {
        // Redis hiccup — fall back rather than block or crash.
        return memLimited(key, Date.now());
      }
    }
    return memLimited(key, Date.now());
  };
}

// Daily counter for a global budget (e.g. Igni's AI answers). Returns the new
// count for today, or null when Upstash is not configured (no global cap then).
export async function incrementDaily(name) {
  const u = await getUpstash();
  if (!u) return null;
  try {
    const key = `${name}:${new Date().toISOString().slice(0, 10)}`;
    const n = await u.redis.incr(key);
    if (n === 1) await u.redis.expire(key, 60 * 60 * 26);
    return n;
  } catch {
    return null;
  }
}

export const isRateLimited = createRateLimiter({ prefix: "ignis:assessment", max: 5 });
