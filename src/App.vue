<template>
  <div class="app-container">
    <main class="main-content">
      <Header v-if="$route.path !== '/admin'" :onCategoryChange="updateCategory"
        :onSubcategoryChange="updateSubcategory" :onHomeClick="resetToHome" />
      <MainContent v-if="$route.path !== '/admin' && ($route.path === '/' || $route.path.startsWith('/category'))"
        :activeCategory="activeCategory" :activeSubcategory="activeSubcategory" />

      <!-- `router-view` 负责显示 `ProductPage.vue` 或其他页面 -->
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import MainContent from "./components/MainContent.vue";

export default {
  components: {
    Header,
    MainContent,
    Footer,
  },
  data() {
    return {
      activeCategory: "", // Null means "All Products"
      activeSubcategory: "",
    };
  },
  created() {
    this.$store.dispatch("fetchUpdatedProducts");
  },
  methods: {
    updateCategory(category) {
      this.activeCategory = category;
      this.activeSubcategory = ""; // Reset subcategory when category changes
    },
    updateSubcategory(subcategory) {
      this.activeSubcategory = subcategory;
    },
    resetToHome() {
      this.activeCategory = null; // Reset category
      this.activeSubcategory = ""; // Reset subcategory
    },
  },
};
</script>

<style>
.app-container {
  background-color: #f9f9f9;
  color: #333;
  min-height: 100vh;
  padding: 20px;
}

.main-content {
  padding-bottom: 60px;
  /* 预留和 footer 相同的高度 */
}
</style>