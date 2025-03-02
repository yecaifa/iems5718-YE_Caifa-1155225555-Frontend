import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: "/",
  resolve: {
    alias: {
      '@': '/src',  // 设置 @ 为 /src 的路径别名
    },
  },
  plugins: [vue()],
});