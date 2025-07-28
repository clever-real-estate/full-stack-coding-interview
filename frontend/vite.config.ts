import { defineConfig } from 'vite';  
import react from '@vitejs/plugin-react';  
//import tailwind from 'tailwindcss';
//import autoprefixer from 'autoprefixer';
  
export default defineConfig({  
  plugins: [react()],  
  test: {  
    globals: true,  
    environment: 'jsdom',  
    setupFiles: './src/test/setup.ts',  
  },  
});
