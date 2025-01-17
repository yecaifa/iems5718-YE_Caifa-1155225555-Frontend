import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: "/iems5718-YE_Caifa-1155225555-Frontend/", // GitHub Pages 部署路径
  plugins: [vue()],
});