import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CategoryPage from "../pages/CategoryPage.vue";
import ProductPage from "../pages/ProductPage.vue";
import AdminPanel from "../pages/AdminPanel.vue";  // 导入 AdminPanel

const BASE_PATH = "/iems5718-YE_Caifa-1155225555-Frontend";

const routes = [
  { path: "/", component: HomePage, meta: { title: "Home - MyShop" } },
  { 
    path: "/product/:pid",  // 更简化的产品详情路径
    component: ProductPage, 
    meta: { title: "Product Details - MyShop" } 
  },
  { 
    path: "/category/:mainCategory/:subCategory", 
    component: CategoryPage, 
    meta: { title: "Categories - MyShop" } 
  },
  { 
    path: "/admin", 
    component: AdminPanel, 
    meta: { title: "Admin Panel - MyShop" }  // 管理页面
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔹 根据 `meta.title` 更新标签页名称
router.afterEach((to) => {
  document.title = to.meta.title || "MyShop"; // 如果没有定义 `meta.title`，使用默认值
});

export default router;