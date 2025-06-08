import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { splitVendorChunkPlugin } from "vite";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  
  return {
    base: '/', // Ensure proper base URL for Vercel
    plugins: [
      react(),
      // Add component tagger in development mode for Lovable features
      mode === 'development' && componentTagger(),
      // Split vendor chunks for better caching
      splitVendorChunkPlugin(),
    ].filter(Boolean),
    server: {
      host: "0.0.0.0",
      port: 8080,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Optimize build settings
      target: "es2015",
      cssCodeSplit: true,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      // Extract CSS into smaller chunks
      cssMinify: !isDev,
      // Write sourcemap only in analyze mode
      sourcemap: mode === "analyze",
      rollupOptions: {
        output: {
          // Improve chunk naming for better cache invalidation
          chunkFileNames: (chunkInfo) => {
            const name = chunkInfo.name;
            if (name === 'vendor') {
              return 'assets/vendor.[hash].js';
            }
            return 'assets/[name].[hash].js';
          },
          // Extract CSS to dedicated files
          assetFileNames: (assetInfo) => {
            const info = assetInfo.name;
            if (info && /\.(css)$/i.test(info)) {
              return 'assets/css/[name].[hash][extname]';
            }
            if (info && /\.(png|jpe?g|gif|svg|webp|avif)$/i.test(info)) {
              return 'assets/images/[name].[hash][extname]';
            }
            if (info && /\.(woff2?|ttf|eot)$/i.test(info)) {
              return 'assets/fonts/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          },
          manualChunks: (id) => {
            // More granular chunk splitting for better caching
            if (id.includes('node_modules')) {
              if (id.includes('react/') || id.includes('react-dom/')) {
                return 'vendor-react';
              }
              if (id.includes('framer-motion')) {
                return 'vendor-framer-motion';
              }
              if (id.includes('@radix-ui/') || id.includes('shadcn')) {
                return 'vendor-ui';
              }
              if (id.includes('@tanstack/')) {
                return 'vendor-tanstack';
              }
              return 'vendor-others';
            }
            
            // Group components by feature
            if (id.includes('/components/portfolio/')) {
              return 'feature-portfolio';
            }
            if (id.includes('/components/ui/')) {
              return 'feature-ui-components';
            }
          },
        },
      },
      // Minification options
      minify: !isDev ? 'terser' : false,
      terserOptions: !isDev ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.debug', 'console.time', 'console.timeEnd'],
        },
        format: {
          comments: false
        }
      } : undefined,
    },
  };
});
