import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  build: {
    sourcemap: true,
    minify: 'terser',
    cssMinify: true,
  },
  server: {
    port: 4321,
    strictPort: true,
    host: true,
  },
  preview: {
    port: 4321,
    strictPort: true,
    host: true,
  },
});
