<template>
  <main class="main-content">
    <ul class="product-list">
      <li v-for="product in filteredProducts" :key="product.pid" class="product-card">
        <router-link :to="`/product/${product.pid}`">
          <div class="product-image-container">
            <img :src="product.imageUrl" :alt="product.name" class="product-image"/>
          </div>
          <h3 class="product-name">{{ product.name }}</h3>
        </router-link>
        <p class="product-description">{{ product.description }}</p>

        <div class="product-bottom">
          <p class="product-price">${{ product.price }}</p>
          <el-button type="primary" @click="addToCart(product)">Add to Cart</el-button>
        </div>
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
  list-style: none;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}

.product-card {
  max-width: 300px;
  border: 1px solid #0b0b0b;
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
  border-color: #000000;
}

/* 图片容器，固定高度 */
.product-image-container {
  width: 100%;
  height: 200px;  /* 固定图片区域高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* 确保图片完整显示 */
}

/* 产品名称 */
.product-name {
  color: #000000;
  margin: 10px 0;
}

/* 产品描述 */
.product-description {
  color: black;
  font-size: 1em;
  font-weight: normal;
  flex-grow: 1; /* 让 description 自适应撑开 card */
}
/* 产品底部部分 (price & add to cart) */
.product-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto; /* 让底部固定在最底部 */
}

.product-price {
  color: red;
  font-size: 1.2em;
  font-weight: bold;
}

.el-button {
  background-color: #3e7f34;
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