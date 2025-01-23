<template>
    <main class="main-content">

      <ul class="product-list">
        <li v-for="product in filteredProducts" :key="product.id" class="product-card">
            <router-link :to="`/product/${product.category}/${product.subcategory}/${product.name}`">
                <img :src="product.image" :alt="product.name" />
                <h3>{{ product.name }}</h3>
            </router-link>
          <p>${{ product.price }}</p>
          <el-button type="primary" @click="addToCart(product)">Add to Cart</el-button>
        </li>
      </ul>
  
      <ShoppingList v-if="showCart" />
    </main>
  </template>
  
  <script>
  export default {
    props: {
      activeCategory: String,
      activeSubcategory: String,
    },
    data() {
        return {
            products: [
            {
                id: 2,
                name: "Samsung Galaxy S23",
                price: 899,
                category: "Electronics",
                subcategory: "Phones",
                description: "Samsung flagship phone with a powerful Snapdragon chip.",
                image: "https://images.samsung.com/is/image/samsung/assets/hk/smartphones/galaxy-s23/images/galaxy-s23-highlights-kv.jpg",
            },
            {
                id: 3,
                name: "MacBook Pro 16",
                price: 2399,
                category: "Electronics",
                subcategory: "Laptops",
                description: "Apple's high-performance laptop with M2 chip.",
                image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp16-spaceblack-select-202410?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1728916322507",
            },
            {
                id: 4,
                name: "Dell XPS 15",
                price: 1799,
                category: "Electronics",
                subcategory: "Laptops",
                description: "Dell's premium laptop for professionals.",
                image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9520/pdp/laptop-xps-15-9520-pdp-mod-03.psd?wid=1900&hei=787&fmt=png-alpha&qlt=100%2c0&op_usm=1.75%2c0.3%2c2%2c0&resMode=sharp2&pscan=auto&fit=constrain%2c1&align=0%2c0",
            },
            {
                id: 5,
                name: "Nike Air Max",
                price: 129,
                category: "Clothes",
                subcategory: "Shoes",
                description: "Comfortable and stylish running shoes from Nike.",
                image: "https://static.nike.com.hk/resources/product/HF3181-001/HF3181-001_M1.png",
            },
            {
                id: 6,
                name: "Adidas Ultraboost",
                price: 149,
                category: "Clothes",
                subcategory: "Shoes",
                description: "High-performance running shoes with Boost technology.",
                image: "https://img.adidas.com.hk/resources/2024/12/17/17344249451633238.JPEG?x-oss-process=image/resize,m_fill,w_400,h_400",
            },
            {
                id: 9,
                name: "Fresh Organic Apples",
                price: 5,
                category: "Groceries",
                subcategory: "Fruits",
                description: "Fresh and organic apples for a healthy snack.",
                image: "https://shoplineimg.com/5cdbde5615c0710001012373/619604db604dda002049dbc1/800x.webp?source_format=jpeg",
            },
            ],
        };
    },
    computed: {
      filteredProducts() {
        if (!this.activeCategory) return this.products; // Show all products on Home
        return this.products.filter(
          (product) =>
            product.category === this.activeCategory &&
            (!this.activeSubcategory ||
              product.subcategory === this.activeSubcategory)
        );
      },
    },
    methods: {
      addToCart(product) {
        this.$store.dispatch('addToCart', product);  // 通过 Vuex 的 action 添加商品到购物车
        this.$notify({
          title: `${product.name} added to cart!`,
          message: `You have added ${product.name} to your shopping cart.`,
          type: 'success',
          duration: 3000, // 持续显示3秒
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 自适应列数 */
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

@media (max-width: 1024px) {
  .product-list {
    grid-template-columns: repeat(3, minmax(200px, 1fr)); 
  }
}

@media (max-width: 768px) {
  .product-list {
    grid-template-columns: repeat(2, minmax(200px, 1fr)); 
  }
}

@media (max-width: 480px) {
  .product-list {
    grid-template-columns: repeat(1, minmax(200px, 1fr)); 
  }
}
  </style>