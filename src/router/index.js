import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CategoryPage from "../pages/CategoryPage.vue";
import ProductPage from "../pages/ProductPage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/product/:main/:sub/:item", component: ProductPage },
  { path: "/category/:mainCategory/:subCategory", component: CategoryPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;