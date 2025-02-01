import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import ElementPlus from "element-plus";
import store from './store'; 
import "element-plus/dist/index.css";
import './styles/global.css';

createApp(App).use(router).use(ElementPlus).use(store).mount("#app");