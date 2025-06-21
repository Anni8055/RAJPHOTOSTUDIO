import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { readFileSync } from 'fs';
import { minify as terserMinify } from 'terser';

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
    {
      name: 'copy-service-worker',
      async writeBundle() {
        try {
          // Read the service worker file
          const serviceWorkerContent = readFileSync(
            path.resolve(__dirname, 'src/serviceWorker.ts'), 
            'utf-8'
          );
          
          // Minify the service worker code
          const minified = await terserMinify(serviceWorkerContent, {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
            mangle: true,
          });
          
          // Add to rollup's output directory
          this.emitFile({
            type: 'asset',
            fileName: 'serviceWorker.js',
            source: minified.code || serviceWorkerContent,
          });
          
          console.log('✓ Service worker copied and minified');
        } catch (error) {
          console.error('Error processing service worker:', error);
        }
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage', 'firebase/analytics'],
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-tooltip',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
