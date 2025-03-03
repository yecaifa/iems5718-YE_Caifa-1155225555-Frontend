<template>
  <header class="header">
    <div class="header-top">
      <h1 @click="goHome" class="home-link">Home</h1>
      <div class="user-actions">
        <!-- Admin Panel 图标 -->
        <el-tooltip content="Admin Panel" placement="right">
          <el-button class="icon-button" @click="goAdminPage">
            <el-icon>
              <Setting />
            </el-icon>
          </el-button>
        </el-tooltip>

      </div>
      <div class="shopping-container">
        <el-button ref="shoppingListButton" class="cart-button" @click="toggleShoppingList"
          @mouseover="showShoppingList = true">
          <el-icon>
            <ShoppingCart />
          </el-icon>
          <span class="cart-total">${{ total }}</span>
        </el-button>

        <!-- 购物车列表：相对购物车按钮展开 -->
        <div v-if="showShoppingList" class="shopping-list-hover" @mouseover="showShoppingList = true"
          @mouseleave="showShoppingList = false">
          <h3>Shopping List (Total: ${{ total }})</h3>
          <table class="shopping-table">
            <thead>
              <tr>
                <th class="name-col">Product</th>
                <th class="qty-col">Qty</th>
                <th class="price-col">Price</th>
                <th class="action-col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cart" :key="index">
                <td class="name-col">{{ item.name }}</td>
                <td class="qty-col">
                  <input type="number" v-model.number="item.quantity" min="1" class="quantity-input" />
                </td>
                <td class="price-col">${{ item.price * item.quantity }}</td>
                <td class="action-col">
                  <button @click="removeFromCart(index)" class="delete-btn">✖</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="checkout">
            <button @click="checkout" class="checkout-btn">Checkout</button>

          </div>
        </div>
      </div>
    </div>

    <!-- 分类菜单 -->
    <div class="header-categories">
      <el-menu mode="horizontal" :default-active="activeCategory">
        <el-menu-item v-for="category in categories" :key="category.catid" :index="String(category.catid)"
          @click="selectCategory(category)">
          {{ category.name }}
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 子类菜单 -->
    <div class="header-subcategories" v-if="activeCategory">
      <el-menu mode="horizontal" :default-active="activeSubcategory">
        <el-menu-item v-for="subcategory in subcategories" :key="subcategory.subcatid" :index="subcategory.subcatid"
          @click="selectSubcategory(subcategory)">
          {{ subcategory.name }}
        </el-menu-item>
      </el-menu>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import api from "@/api";
import { ShoppingCart, Setting } from '@element-plus/icons-vue';

export default {
  props: {
    onCategoryChange: Function,
    onSubcategoryChange: Function,
    onHomeClick: Function,
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
      return this.$store.getters.cartTotal;
    },
  },
  data() {
    return {
      searchQuery: "",
      activeCategory: null,
      activeSubcategory: null,
      categories: [],
      subcategories: [],
      showShoppingList: false,
      shoppingListPosition: { top: "30px", left: "0px" },
    };
  },
  mounted() {
    this.loadCategories();
    const storedCart = JSON.parse(localStorage.getItem("shoppingCart"));
    if (storedCart) {
      this.$store.state.cart = storedCart;
    }
  },
  methods: {
    async loadCategories() {
      try {
        this.categories = await api.fetchCategories();
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    },

    async loadSubcategories(categoryId) {
      try {
        this.subcategories = await api.fetchSubcategories(categoryId);
      } catch (error) {
        console.error("Failed to load subcategories:", error);
      }
    },
    goAdminPage() {
      this.$router.push("/admin");
    },
    selectCategory(category) {
      this.activeCategory = category.catid;
      this.activeSubcategory = "";
      this.loadSubcategories(category.catid);
      this.$router.push(`/category/${category.catid}`);
      this.onCategoryChange(category.catid);
    },
    selectSubcategory(subcategory) {
      this.activeSubcategory = subcategory.subcatid;
      this.$router.push(`/category/${this.activeCategory}/${subcategory.subcatid}`);
      this.onSubcategoryChange(subcategory.subcatid);
    },
    goHome() {
      this.activeCategory = null;
      this.activeSubcategory = "";
      this.$router.push("/");
      this.onHomeClick();
    },
    removeFromCart(index) {
      console.log(index);
      this.$store.commit("REMOVE_FROM_CART", index);
    },
    toggleCartVisibility() {
      this.showShoppingList = !this.showShoppingList;
      if (this.showShoppingList) {
        this.calculateShoppingListPosition();
      }
    },
    calculateShoppingListPosition() {
      const button = this.$refs.shoppingListButton;
      if (!button) return;

      const rect = button.getBoundingClientRect();

      this.shoppingListPosition = {
        top: `${rect.top + window.scrollY + button.offsetHeight + 5}px`, // 距离按钮底部5px
        left: `${rect.left + window.scrollX}px`, // 水平对齐按钮左侧
      };
    },
    toggleShoppingList() {
      this.showShoppingList = !this.showShoppingList;
    },
    checkout() {
      alert("Proceeding to checkout...");
    },
  },
};
</script>

<style>
.user-actions{
  display: flex;
  gap: 10px;
  margin: 10px;
}
/* 悬浮购物车样式 */
.shopping-list-hover {
  position: absolute;
  padding: 10px;
  background-color: rgb(71, 65, 65);
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 400px;
  cursor: pointer;
  right: 0;
  border-radius: 8px;

}

/* 购物车表格 */
.shopping-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.shopping-table th,
.shopping-table td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.shopping-table th {
  text-align: left;
  font-weight: bold;
}

.name-col {
  width: 50%;
  text-align: left;
}

.qty-col,
.price-col,
.action-col {
  width: 15%;
  text-align: right;
}

/* 输入框 */
.quantity-input {
  width: 40px;
  text-align: center;
}

/* 删除按钮 */
.delete-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.delete-btn:hover {
  background-color: darkred;
}

/* 结账按钮 */
.checkout {
  margin-top: 10px;
  margin-left: 100px;
  text-align: right;
}

.checkout-btn {
  background-color: #4caf50;
  color: white;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.checkout-btn:hover {
  background-color: #388e3c;
}
</style>