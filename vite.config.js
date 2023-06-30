import { defineConfig } from 'vite';
const NODE_ENV = process.env.NODE_ENV || 'dev';
const PORT = process.env.PORT || 3000;

export default defineConfig({
  base: NODE_ENV === 'production' ? './' : './',
  server: {
    port: PORT,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: 'index.html',
      output:
       {
         format: 'es',
         strict: false,
         dir: 'dist/',
         entryFileNames: `assets/[name].js`,
         chunkFileNames: `assets/[name].js`,
         assetFileNames: `assets/[name].[ext]`,
       }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        additionalData: `// @use "./src/scss/index.scss" as *;`
      }
    }
  }
});
