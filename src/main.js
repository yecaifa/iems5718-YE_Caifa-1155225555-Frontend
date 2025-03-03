import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import ElementPlus from "element-plus";
import store from './store';
import "element-plus/dist/index.css";
import './styles/global.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const app = createApp(App);

// 全局注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router).use(ElementPlus).use(store).mount("#app");