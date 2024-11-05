import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
  },
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

    chunkSizeWarningLimit: 1000,

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
