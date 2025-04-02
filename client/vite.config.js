import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd()); // Load environment variables

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src', // Correctly placed alias
      },
    },
    server: {
      open: true,
      host:true,
      hot:true,
      allowedHosts:['erp.eriz.am'],
      port: 5444,
      proxy: {
        '/api': {
          target: 'https://127.0.0.1:5443', // Backend server
          //target: 'https://37.157.213.96:5443',
          changeOrigin: true, // Ensure the request appears to come from the frontend server
          secure:false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});

