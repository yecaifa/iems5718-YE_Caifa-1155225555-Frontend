<template>
  <div class="shopping-list-container">
    <div class="shopping-list">
      <h3>Shopping List (Total: ${{ total }})</h3>

      <table class="shopping-table">
        <thead>
          <tr>
            <th>#</th>
            <th class="product-name-header">Product Name</th>
            <th class="right-align">Unit Price ($)</th>
            <th class="right-align">Quantity</th>
            <th class="right-align">Total ($)</th>
            <th class="right-align">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index">
            <td>{{ index + 1 }}</td>
            <td class="product-name">{{ item.name }}</td>
            <td class="right-align">${{ item.price.toFixed(2) }}</td>
            <td class="right-align">
              <input type="number" v-model="item.quantity" min="1" class="quantity-input" @change="updateCart">
            </td>
            <td class="right-align">${{ (item.price * item.quantity).toFixed(2) }}</td>
            <td class="right-align">
              <button @click="removeFromCart(index)" class="delete-btn">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>

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
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    }
  },
  methods: {
    updateCart() {
      this.$emit('update-cart', this.cart);
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.updateCart();
    },
    checkout() {
      alert("Proceeding to checkout...");
    }
  }
};
</script>

<style>
.shopping-list-container {
  position: absolute;
  padding: 15px;
  background-color: #06647a;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 600px;
  text-align: center;
}

.shopping-list {
  font-family: Arial, sans-serif;
}

/* 表格样式 */
.shopping-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background: white;
}

.shopping-table th,
.shopping-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

/* 表头 */
.shopping-table th {
  background-color: #4CAF50;
  color: white;
  text-align: center;
}

/* 商品名称左对齐 */
.product-name {
  text-align: left;
  padding-left: 10px;
}

.product-name-header {
  text-align: left;
}

/* 右对齐列 */
.right-align {
  text-align: right;
}

/* 数量输入框 */
.quantity-input {
  width: 50px;
  padding: 5px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* 删除按钮 */
.delete-btn {
  padding: 5px 10px;
  background-color: #d9534f;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.delete-btn:hover {
  background-color: #c9302c;
}

/* 结账按钮 */
.checkout-btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.checkout-btn:hover {
  background-color: #45a049;
}
</style>