<template>
  <main class="main-content">
    <ul class="product-list">
      <li v-for="product in filteredProducts" :key="product.pid" class="product-card">
        <router-link :to="`/product/${product.pid}`">
          <img :src="product.imageUrl" :alt="product.name" />
          <h3>{{ product.name }}</h3>
        </router-link>
        <p>{{ product.description }}</p>
        <p>${{ product.price }}</p>
        <el-button type="primary" @click="addToCart(product)">Add to Cart</el-button>
      </li>
    </ul>
  </main>
</template>

<script>
import axios from "axios";
import api from "@/api";
export default {
  props: {
    activeCategory: Number,  // 接收父组件传递的 activeCategory
    activeSubcategory: Number,  // 接收父组件传递的 activeSubcategory
  },
  data() {
    return {
      products: [],  // 存储所有产品
    };
  },
  computed: {
    // 根据 activeCategory 和 activeSubcategory 过滤产品
    filteredProducts() {
      return this.products.filter(product => {
        // 如果选择了 category 和 subcategory
        if (this.activeCategory && this.activeSubcategory) {
          return (
            product.subcategory &&
            product.subcategory.category.catid === this.activeCategory &&
            product.subcategory.subcatid === this.activeSubcategory
          );
        }
        // 如果只选择了 category
        if (this.activeCategory) {
          return (
            product.subcategory &&
            product.subcategory.category.catid === this.activeCategory
          );
        }
        // 如果没有选择 category 或 subcategory，显示所有产品
        return true;
      });
    },
  },
  mounted() {
    this.loadProducts(); // 组件挂载时获取产品数据
  },
  methods: {
    async loadProducts() {
      try {
        this.products = await api.fetchProducts();
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);  // 使用 Vuex 将商品添加到购物车
      this.$notify({
        title: `[${product.name}] added to cart!`,
        // message: `You have added ${product.name} to your shopping cart.`,
        type: 'success',
        duration: 1500,  // 显示3秒
        customClass: 'custom-notification',
      });
    }
  }
};
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 0;
  margin: 0 auto;
  list-style: none;
}

.product-card {
  max-width: 300px;
  border: 1px solid #85C1E9;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-color: #3498DB;
}

.product-card img {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.product-card h3 {
  color: #3498DB;
  margin: 10px 0;
}

.product-card p {
  color: #5DADE2;
  font-size: 1.2em;
  font-weight: bold;
}

.el-button {
  background-color: #3498DB;
  color: white;
  border: none;
}

.el-button:hover {
  background-color: #21618C;
}
.custom-notification {
  min-width: 350px;  
  max-width: 800px;
}
</style>