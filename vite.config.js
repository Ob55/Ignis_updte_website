import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, pathToFileURL, URL } from 'node:url';
import fs from 'node:fs';

// `npm run dev` only: serve the Vercel functions in api/ (Igni's /api/chat, the
// enquiry forms' /api/assessment) so they work locally without `vercel dev`.
// Server-only vars from .env / .env.local are loaded into process.env here and
// never reach the client bundle (only VITE_* vars do).
function devApi() {
  return {
    name: 'ignis-dev-api',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv('development', server.config.root, '');
      for (const [k, v] of Object.entries(env)) if (!(k in process.env)) process.env[k] = v;

      server.middlewares.use('/api', async (req, res, next) => {
        const name = (req.url || '').split('?')[0].replace(/^\/+/, '');
        const file = fileURLToPath(new URL(`./api/${name}.js`, import.meta.url));
        if (!/^[a-z-]+$/.test(name) || !fs.existsSync(file)) return next();

        let raw = '';
        for await (const chunk of req) raw += chunk;
        try { req.body = raw ? JSON.parse(raw) : {}; } catch { req.body = {}; }
        res.status = (code) => { res.statusCode = code; return res; };
        res.json = (data) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); };

        try {
          // cache-busted so edits to api/*.js apply on the next request
          const mod = await import(`${pathToFileURL(file).href}?t=${Date.now()}`);
          await mod.default(req, res);
        } catch (err) {
          console.error(`[dev-api] /api/${name}:`, err);
          if (!res.headersSent) res.status(500).json({ error: 'Dev API error' });
          else res.end();
        }
      });
    },
  };
}

// Plain React + Vite. `@` resolves to the project root so existing imports
// like `@/components/...`, `@/data/...` keep working.
export default defineConfig({
  plugins: [react(), devApi()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  server: { port: 3000 },
});
