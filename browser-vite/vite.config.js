import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    },
    modulePreload: {
      polyfill: false
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: false
  },
  resolve: {
    alias: {
      '@samples': path.resolve(__dirname, 'src/samples')
    }
  }
});
