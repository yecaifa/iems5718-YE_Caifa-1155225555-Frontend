<template>
  <div class="app-container">
    <Header
      :onCategoryChange="updateCategory"
      :onSubcategoryChange="updateSubcategory"
      :onHomeClick="resetToHome"
    />
    <MainContent
      v-if="$route.path === '/' || $route.path.startsWith('/category')"
      :activeCategory="activeCategory"
      :activeSubcategory="activeSubcategory"
    />

    <!-- `router-view` 负责显示 `ProductPage.vue` 或其他页面 -->
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import MainContent from "./components/MainContent.vue";

export default {
  components: {
    Header,
    MainContent,
  },
  data() {
    return {
      activeCategory: null, // Null means "All Products"
      activeSubcategory: "",
    };
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
</style>