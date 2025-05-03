import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
function componentTagger() {
  return {
    name: 'vite-plugin-component-tagger',
    transform(code: string, id: string) {
      // Only process React component files
      if (!id.match(/\.(tsx|jsx)$/)) return;

      // Check if the file exports a component
      if (!code.includes('export default') || !code.includes('React')) return;

      // Extract component name from filename
      const componentName = path.basename(id).replace(/\.[^/.]+$/, '');

      // Add data-component attribute to the component's root element
      return code.replace(
        /(return\s*\()(\s*<)/g,
        `$1$2div data-component="${componentName}"><`
      );
    }
  };
}

