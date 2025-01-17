<template>
    <header class="header">
      <div class="header-top">
        <h1 @click="goHome" class="home-link">Home</h1>
        <div class="search-bar">
          <el-input
            v-model="searchQuery"
            placeholder="Search products..."
            clearable
          >
            <template #append>
              <el-button icon="el-icon-search" class="custom-button">Search</el-button>
            </template>
          </el-input>
        </div>
        <div class="user-actions">
          <el-button type="text" icon="el-icon-shopping-cart" class="custom-button">Cart</el-button>
          <el-button type="text" icon="el-icon-user" class="custom-button">Account</el-button>
        </div>
      </div>
  
      <!-- 大类菜单 -->
      <div class="header-categories">
        <el-menu mode="horizontal" :default-active="activeCategory">
          <el-menu-item
            v-for="category in categories"
            :key="category.name"
            @click="selectCategory(category)"
          >
            {{ category.name }}
          </el-menu-item>
        </el-menu>
      </div>
  
      <!-- 子类菜单 -->
      <div class="header-subcategories" v-if="activeCategory">
        <el-menu mode="horizontal" :default-active="activeSubcategory">
          <el-menu-item
            v-for="subcategory in activeCategory.subcategories"
            :key="subcategory"
            @click="selectSubcategory(subcategory)"
          >
            {{ subcategory }}
          </el-menu-item>
        </el-menu>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    props: {
      onCategoryChange: Function,
      onSubcategoryChange: Function,
      onHomeClick: Function,
    },
    data() {
      return {
        searchQuery: "",
        activeCategory: null,
        activeSubcategory: "",
        categories: [
          {
            name: "Electronics",
            subcategories: ["Phones", "Laptops", "Cameras"],
          },
          {
            name: "Clothes",
            subcategories: ["Men", "Women", "Kids"],
          },
          {
            name: "Groceries",
            subcategories: ["Fruits", "Vegetables", "Snacks"],
          },
        ],
      };
    },
    methods: {
        selectCategory(category) {
            this.activeCategory = category;
            this.activeSubcategory = "";
            this.$router.push(`/category/${category.name}`); // ✅ 更新 URL
            this.onCategoryChange(category.name); // ✅ 通知父组件
        },
        selectSubcategory(subcategory) {
            this.activeSubcategory = subcategory;
            this.$router.push(`/category/${this.activeCategory.name}/${subcategory}`); // ✅ 更新 URL
            this.onSubcategoryChange(subcategory); // ✅ 通知父组件
        },
        goHome() {
            this.activeCategory = null;
            this.activeSubcategory = "";
            this.$router.push("/"); // ✅ 更新 URL
            this.onHomeClick(); // ✅ 通知父组件
        },
    },
  };
  </script>
  
  <style>
  
  </style>