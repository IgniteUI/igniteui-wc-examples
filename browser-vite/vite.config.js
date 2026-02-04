import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: path.resolve(__dirname),
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
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [
          path.resolve(__dirname, '..', 'node_modules'),
          path.resolve(__dirname, 'src')
        ]
      }
    }
  }
});
