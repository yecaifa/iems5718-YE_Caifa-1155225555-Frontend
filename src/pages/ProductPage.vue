<template>
    <main v-if="product">
      <div class="product-container">
        <div class="product-image">
          <img :src="product.imageUrl" :alt="product.name" />
        </div>
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <p class="description">{{ product.description }}</p>
          <p class="price">${{ product.price }}</p>
          <el-button type="primary" @click="addToCart(product)">Add to Cart</el-button>
        </div>
      </div>
    </main>
  
    <main v-else>
      <p>⚠️ Product not found. Please check the URL.</p>
    </main>
  </template>
  
  <script>
  import axios from "axios";
  import api from "@/api";
  
  export default {
    data() {
      return {
        product: null, // 用来存储从 API 获取的产品数据
      };
    },
    computed: {
      productId() {
        return this.$route.params.pid; // 获取传递的 pid
      },
    },
    mounted() {
      this.fetchProduct();
    },
    watch: {
      "$route.params.pid": {
        immediate: true,
        handler() {
          this.fetchProduct(); // 当 pid 改变时重新获取产品数据
        },
      },
    },
    methods: {
        async fetchProduct() {
            try {
            const response = await api.fetchProductById(this.productId); // 调用 API 模块的方法
            if (response) {
                this.product = response;
            } else {
                console.error("Product not found for pid:", this.productId);
            }
            } catch (error) {
            console.error("Failed to fetch product:", error);
            }
        },
      addToCart(product) {
        this.$store.dispatch("addToCart", product); // 假设你使用 Vuex 来管理购物车
        this.$notify({
          title: `${product.name} added to cart!`,
          message: `You have added ${product.name} to your shopping cart.`,
          type: "success",
          duration: 3000, // 持续显示3秒
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .product-container {
    display: flex;
    flex-direction: column; /* 图片和产品信息垂直排列 */
    align-items: center;
    gap: 30px;
    padding: 20px;
  }
  
  .product-image img {
    width: 100%; /* 图片占满父容器的宽度 */
    max-width: 1000px; /* 最大宽度设置为600px */
    height: auto;
    border-radius: 10px;
    object-fit: contain; /* 保持图片的比例 */
  }
  
  .product-info {
    text-align: center; /* 产品信息居中 */
    max-width: 600px;
  }
  
  .category {
    font-size: 14px;
    color: gray;
  }
  
  .description {
    font-size: 16px;
    margin: 10px 0;
  }
  
  .price {
    font-size: 24px;
    color: #3498db;
    font-weight: bold;
    margin: 10px 0;
  }
  
  .el-button {
    background-color: #3498db;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .el-button:hover {
    background-color: #21618c;
  }
  </style>