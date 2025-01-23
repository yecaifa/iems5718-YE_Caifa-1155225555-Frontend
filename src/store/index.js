// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      cart: [], // 存储购物车数据
    };
  },
  mutations: {
    // 添加商品到购物车
    ADD_TO_CART(state, product) {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    // 删除购物车商品
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    },
    // 更新商品数量
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const product = state.cart.find(item => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    }
  },
  actions: {
    // 异步调用添加商品到购物车
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
    },
  },
  getters: {
    cartTotal(state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    cartItemCount(state) {
      return state.cart.reduce((count, item) => count + item.quantity, 0);
    },
  }
});

export default store;