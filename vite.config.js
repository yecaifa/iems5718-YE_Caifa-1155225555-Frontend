import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: "/iems5718-YE_Caifa-1155225555-Frontend/",
  resolve: {
    alias: {
      '@': '/src',  // 设置 @ 为 /src 的路径别名
    },
  },
  plugins: [vue()],
});