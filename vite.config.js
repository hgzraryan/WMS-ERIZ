/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // Load environment variables

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src', // Correctly placed alias
      },
    },
    server: {
      open: true,
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://37.186.119.16:5443', // Backend server
          changeOrigin: true, // Ensure the request appears to come from the frontend server
          secure:false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});

