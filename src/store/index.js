// src/store/index.js
import { createStore } from 'vuex';
import axios from "axios";
import api from "@/api";
const store = createStore({
  state() {
    return {
      cart: JSON.parse(localStorage.getItem("shoppingCart")) || []
    };
  },
  watch: {
    cart: {
      deep: true,
      handler(newCart) {
        localStorage.setItem("shoppingCart", JSON.stringify(newCart));
      }
    }
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const existingProduct = state.cart.find(item => item.pid === product.pid);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      store.commit("UPDATE_CART_ITEMS");
    },
    REMOVE_FROM_CART(state, index) {
      state.cart.splice(index, 1);
      store.commit("UPDATE_CART_ITEMS");
    },
    UPDATE_QUANTITY(state, { productId, quantity }) {
      const product = state.cart.find(item => item.pid === productId);
      if (product) {
        product.quantity = quantity;
        store.commit("UPDATE_CART_ITEMS");
      }
    },
    UPDATE_CART_ITEMS(state) {
      localStorage.setItem("shoppingCart", JSON.stringify(state.cart));
    },
    SET_CART_ITEMS(state, updatedCart) {
      state.cart = updatedCart;
      store.commit("UPDATE_CART_ITEMS");
    }
  },
  actions: {
    // 异步调用添加商品到购物车
    async addToCart({ commit }, product) {
      try {
        // 请求后端最新的产品数据
        const response = await api.fetchProductById(product.pid);
        const updatedProduct = {
          ...product,
          name: response.name,
          price: response.price
        };
        commit("ADD_TO_CART", updatedProduct);
      } catch (error) {
        console.error("Error fetching product data:", error);
        commit("ADD_TO_CART", product); // 请求失败时，使用原数据
      }
    },
    async fetchUpdatedProducts({ commit, state }) {
      try {
        const updatedCart = await Promise.all(
          state.cart.map(async (item) => {
            try {
              // console.log(item)
              const response = await api.fetchProductById(item.pid);
              // console.log(response.data)
              return {
                ...item,
                name: response.name,
                price: response.price
              };
            } catch (error) {
              console.error(`Failed to update product ${item.pid}`, error);
              return item; // 失败时保留原数据
            }
          })
        );
        commit("SET_CART_ITEMS", updatedCart);
      } catch (error) {
        console.error("Error updating cart items:", error);
      }
    }
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