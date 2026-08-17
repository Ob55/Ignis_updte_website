import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// Plain React + Vite. `@` resolves to the project root so existing imports
// like `@/components/...`, `@/data/...` keep working.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
  server: { port: 3000 },
});
