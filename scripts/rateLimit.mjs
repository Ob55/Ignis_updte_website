// Rate limiter for the serverless API. Uses Upstash Redis when configured
// (UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN) for a durable, distributed
// sliding window shared across every serverless instance. Falls back to a
// best-effort in-memory window (per warm instance) when Upstash is not set, so
// the endpoint always has some protection and never fails to load.

const WINDOW = "10 m";
const MAX = 5;

let limiterPromise = null; // memoised Upstash limiter (or null)

async function getUpstashLimiter() {
  if (limiterPromise) return limiterPromise;
  limiterPromise = (async () => {
    const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;
    if (!UPSTASH_REDIS_REST_URL || !UPSTASH_REDIS_REST_TOKEN) return null;
    try {
      const [{ Ratelimit }, { Redis }] = await Promise.all([
        import("@upstash/ratelimit"),
        import("@upstash/redis"),
      ]);
      return new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(MAX, WINDOW),
        prefix: "ignis:assessment",
        analytics: false,
      });
    } catch {
      return null; // never let limiter setup take down the endpoint
    }
  })();
  return limiterPromise;
}

// ---- in-memory fallback (per warm instance) --------------------------------
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map();
function memLimited(ip, now) {
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear(); // bound memory
  return arr.length > MAX;
}

// Returns true when the caller has exceeded the limit and should be blocked.
export async function isRateLimited(ip) {
  const key = ip || "unknown";
  const limiter = await getUpstashLimiter();
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
}
