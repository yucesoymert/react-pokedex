import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // same port and output folder as Create React App, so habits and the /build ignore rule still hold
  server: { port: 3000 },
  build: { outDir: 'build' },
  // Vitest: test/expect as globals, like Jest under CRA
  test: { globals: true },
});
