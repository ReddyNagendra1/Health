import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Increase the chunk size warning limit if the warning is not critical for your setup
    chunkSizeWarningLimit: 1000, // Sets limit to 1000 kB to reduce warnings

    // Configure manual chunks to split large libraries
    rollupOptions: {
      output: {
        manualChunks: {
          // Creates a separate chunk for React and other large libraries
          vendor: ['react', 'react-dom'],
          // Add other libraries that contribute to large bundles if needed
        },
      },
    },
  },
});
