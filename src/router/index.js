import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CategoryPage from "../pages/CategoryPage.vue";
import ProductPage from "../pages/ProductPage.vue";
import AdminPanel from "../pages/AdminPanel.vue"; 
import Login from "../pages/Login.vue"; 
import ChangePassword from "../pages/ChangePassword.vue";

const routes = [
  { path: "/", component: HomePage, meta: { title: "Home - MyShop" } },
  { path: "/login", component: Login, meta: { title: "Login - MyShop" } }, // 登录页
  { path: '/change-password', component: ChangePassword },
  { 
    path: "/product/:pid",  
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
    meta: { title: "Admin Panel - MyShop", requiresAuth: true }  // 需要登录
  },
];

const router = createRouter({
  history: createWebHistory(), // 确保路径适配 GitHub Pages
  routes,
});

// 🔹 更新标签页标题
router.afterEach((to) => {
  document.title = to.meta.title || "MyShop";
});

// 🛑 路由守卫
router.beforeEach(async (to, from, next) => {
  // const authToken = localStorage.getItem("authToken");
  const user = localStorage.getItem("user"); // 读取角色信息

  if (to.meta.requiresAuth) {
    // 如果是管理员页面，确保用户是管理员
    if (to.path.startsWith("/admin") && user.isAdmin) {
      return next("/"); // 普通用户访问 admin，重定向到首页
    }
  }

  next();
});

export default router;