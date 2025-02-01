<template>
  <header class="header">
    <div class="header-top">
      <h1 @click="goHome" class="home-link">Home</h1>
      
    </div>
    <div class="user-actions">
      <el-button
        ref="shoppingListButton"  
        type="text"
        class="custom-button"
        @mouseover="showShoppingList = true"
      >
        Shopping List   ${{ total }}
      </el-button>

      <div
        v-if="showShoppingList"
        class="shopping-list-hover"
        :style="shoppingListPosition"
        @mouseover="showShoppingList = true"
        @mouseleave="showShoppingList = false"
      >
        <h3>Shopping List (Total: ${{ total }})</h3>
        <div v-for="(item, index) in cart" :key="index" class="shopping-item">
          <span>{{ item.name }} ({{ item.quantity }})</span>
          <input type="number" v-model.number="item.quantity" min="1" class="quantity-input" />
          <span>@{{ item.price * item.quantity }}</span>
        </div>
        <div class="checkout">
          <button @click="checkout" class="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
    <!-- 分类菜单 -->
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
  computed: {
    cart() {
      return this.$store.state.cart; // 从 Vuex 获取购物车数据
    },
    total() {
      return this.$store.getters.cartTotal; // 从 Vuex 获取购物车总价
    }
  },
  data() {
    return {
      searchQuery: "",
      activeCategory: null,
      activeSubcategory: "",
      categories: [
        { name: "Electronics", subcategories: ["Phones", "Laptops", "Cameras"] },
        { name: "Clothes", subcategories: ["Men", "Women", "Kids"] },
        { name: "Groceries", subcategories: ["Fruits", "Vegetables", "Snacks"] },
      ],
      showShoppingList: false, // 控制悬浮框的显示与隐藏
      shoppingListPosition: { top: "30px", left: "0px" }, // 悬浮框的位置
    };
  },
  methods: {
    selectCategory(category) {
      this.activeCategory = category;
      this.activeSubcategory = "";
            this.$router.push(`/category/${category.name}`); // 更新 URL
            this.onCategoryChange(category.name); // 通知父组件
        },
        selectSubcategory(subcategory) {
            this.activeSubcategory = subcategory;
            this.$router.push(`/category/${this.activeCategory.name}/${subcategory}`); // 更新 URL
            this.onSubcategoryChange(subcategory); // 通知父组件
    },
    goHome() {
      this.activeCategory = null;
      this.activeSubcategory = "";
      this.$router.push("/");
      this.onHomeClick();
    },
    toggleCartVisibility() {
      this.showShoppingList = !this.showShoppingList; // 切换购物清单显示
      if (this.showShoppingList) {
        this.calculateShoppingListPosition(); // 计算并设置悬浮框的位置
      }
    },
  
    calculateShoppingListPosition() {
      const button = this.$refs.shoppingListButton; 
      const rect = button.getBoundingClientRect(); 

      this.shoppingListPosition = {
        top: `${rect.top + window.scrollY + button.offsetHeight + 10}px`,
        left: `${rect.left + window.scrollX - 210}px`, 
      };
    },
  },
};
</script>

<style>
.shopping-list-button {
  background-color: #0c1b25; 
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.shopping-list-hover {
  position: absolute;
  padding: 10px;
  background-color: #06647a;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 500px; 
  cursor: pointer;
}

.search-bar {
  max-width: 400px;
  width: 50%;
}
</style>