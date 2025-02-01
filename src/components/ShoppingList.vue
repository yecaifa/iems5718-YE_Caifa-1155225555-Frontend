<template>
    <div class="shopping-list-container">
      <div class="shopping-list">
        <h3>Shopping List (Total: ${{ total }})</h3>
        <div v-for="(item, index) in cart" :key="index" class="shopping-item">
          <div class="item-details">
            
            <span class="item-name">{{ item.name }}</span>
            
            <span class="item-quantity">[{{ item.quantity }}]</span>
            
            <span class="item-price">@{{ item.price * item.quantity }}</span>
          </div>
        </div>
        <div class="checkout">
          <button @click="checkout" class="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      total() {
        return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    },
    methods: {
      checkout() {
        alert("Proceeding to checkout...");
      }
    }
  };
  </script>
  
  <style scoped>
  .shopping-list-container {
    position: absolute;
    padding: 10px;
    background-color: #06647a;
    border: 1px solid #ccc;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    width: 500px;
    text-align: center;
    cursor: pointer;
  }
  
  .shopping-list {
    font-family: Arial, sans-serif;
  }
  
  .shopping-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  
  .item-details {
    display: flex;
    justify-content: flex-start; 
    width: 100%;
    align-items: center; 
  }
  
  .item-name {
    flex: 3; 
    text-align: left;
  }
  
  .item-quantity {
    flex: 1;
    text-align: center; 
  }
  
  .item-price {
    flex: 1;
    text-align: right; 
  }
  
  .checkout-btn {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .checkout-btn:hover {
    background-color: #45a049;
  }
  </style>