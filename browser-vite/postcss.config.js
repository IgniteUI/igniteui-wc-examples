import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  plugins: {
    'postcss-import': {
      resolve: (id) => {
        // If the import starts with a package name (not a relative path)
        if (!id.startsWith('.') && !id.startsWith('/')) {
          // Try to resolve from the root node_modules
          return path.resolve(__dirname, '..', 'node_modules', id);
        }
        return id;
      }
    },
    autoprefixer: {},
    "@tailwindcss/postcss": {},
  },
};
