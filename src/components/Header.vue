<template>
  <header class="header">
    <div class="header-top">
      <h1 @click="goHome" class="home-link">Home</h1>
      <!-- 用户身份按钮 -->
      <div class="user-dropdown">
        <el-dropdown trigger="click">
          <el-button class="user-button">
            <el-icon>
              <User />
            </el-icon>
            {{ userInfo }}
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-if="userInfo === 'Guest'" @click="goLogin">Login</el-dropdown-item>
              <template v-else>
                <el-dropdown-item @click="goChangePassword">Change Password</el-dropdown-item>
                <el-dropdown-item @click="logout">Logout</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="user-actions">
        <!-- Admin Panel 图标 -->

        <el-tooltip content="Admin Panel" placement="bottom">
          <el-button class="icon-button" @click="goAdminPage">
            <el-icon>
              <Setting />
            </el-icon>
            <span> Admin Panel</span>
          </el-button>
        </el-tooltip>

      </div>
      <div class="shopping-container">
        <el-button ref="shoppingListButton" class="cart-button" @click="toggleShoppingList"
          @mouseover="toggleShoppingList(true)" @mouseleave="leaveList(false)">
          <el-icon>
            <ShoppingCart />
          </el-icon>
          <span class="cart-total">${{ total }}</span>
        </el-button>

        <!-- 购物车列表：相对购物车按钮展开 -->
        <div v-if="showShoppingList" class="shopping-list-hover" @mouseover="isMouseOverCart = true"
          @mouseleave="leaveList(false)">
          <h3>Total: ${{ total }}</h3>
          <table class="shopping-table">
            <thead>
              <tr>
                <th class="img-col"></th>
                <th class="name-col"></th>
                <th class="qty-col"></th>
                <th class="price-col"></th>
                <th class="action-col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cart" :key="index">
                <td class="img-col">
                  <img :src="item.imageUrl" alt="Product Image" class="cart-item-img" />
                </td>
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
import { ElMessage } from "element-plus";
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
    userInfo() {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      if (user && user.username) {
        return `${user.username} (${user.isAdmin ? 'Admin' : 'User'})`;
      }
      return "Guest";
    },
    role() {
      const user = JSON.parse(localStorage.getItem("user")) || null;
      if (user) {
        return user.isAdmin ? 'Admin' : 'User';
      }
      return "Guest";
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
      isMouseOverCart: false,
      shoppingListPosition: { top: "30px", left: "0px" },
    };
  },
  mounted() {
    this.loadCategories();
    // this.getUserRole();
    const storedCart = JSON.parse(localStorage.getItem("shoppingCart"));
    if (storedCart) {
      this.$store.state.cart = storedCart;
    }
  },
  methods: {
    goChangePassword() {
      this.$router.push("/change-password");
    },
    goLogin() {
      this.$router.push("/login");
    },
    logout() {
      localStorage.removeItem("user");
      ElMessage.success("Logged out successfully.");
      this.$router.push("/");
      setTimeout(() => {
        window.location.reload();  // 刷新页面
      }, 100);
    },
    goAdminPage() {
      if (this.role === "Admin") {
        console.log(this.role)
        this.$router.push("/admin");
      } else {
        console.log(this.role)
        ElMessage.error("You do not have permission to access Admin Panel!");
      }
    },
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
    leaveList(isHovering) { this.isMouseOverCart = false, this.toggleShoppingList(isHovering) },
    toggleShoppingList(isHovering) {
      if (isHovering) {
        this.showShoppingList = true;
        this.isMouseOverCart = true;
      } else {
        setTimeout(() => {
          if (!this.isMouseOverCart) {
            this.showShoppingList = false;
          }
        }, 100); // 添加一个短暂的延迟，防止误触
      }
    },
    checkout() {
      alert("Proceeding to checkout...");
    },
  },
};
</script>

<style>
.user-actions {
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

.img-col {
  width: 60px;
}

.img-col img.cart-item-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
}
</style>