import axios from "axios";
// 统一 API 根路径，使用环境变量
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://yecaifa.eastasia.cloudapp.azure.com";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

axios.defaults.withCredentials = true; // ✅ 允许跨域请求携带 Cookies

// ✅ 发送 CSRF Token
axios.interceptors.request.use((config) => {
  const csrfToken = getCookie("XSRF-TOKEN"); // 获取 CSRF Token
  if (csrfToken) {
    config.headers["X-CSRF-TOKEN"] = csrfToken;
  }
  return config;
});

// ✅ 获取 Cookie 方法
function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
const api = {
  async changePassword(oldPassword, newPassword) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/change-password`,
        { oldPassword, newPassword }, // 请求体
        { withCredentials: true } // ✅ 携带 Cookie
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Change password error:", error);
      throw new Error("Failed to change password. Please try again.");
    }
  },
  async login(email, password) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true } // ✅ 确保请求携带 Cookie
      );

      if (response.data.success) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify({
          username: response.data.user.email,
          isAdmin: response.data.user.is_admin
        }));
        // localStorage.setItem("userRole", response.data.user.is_admin ? "Admin" : "User");
        // localStorage.setItem("userName", response.data.user.email); // 存储 userId
        // console.log(localStorage.getItem("userRole"));
        console.log(localStorage.getItem("user"));
        // this.$router.push(response.data.user.is_admin ? "/admin" : "/");
        return response.data;
      } else {
        throw new Error("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Login failed. Please try again.");
    }
  },

  async logout() {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  async checkAuth() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/check-auth`, { withCredentials: true });
      return response.data.user;
    } catch (error) {
      console.error("Check Auth error:", error);
      return null;
    }
  },
  // 获取所有类别
  async fetchCategories() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/categories`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  // 获取某个类别下的所有子类别
  async fetchSubcategories(categoryId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/categories/${categoryId}/subcategories`);
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      throw error;
    }
  },

  // 获取所有产品
  async fetchProducts() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  // 根据产品 ID 获取单个产品
  async fetchProductById(productId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  },

  // 添加新类别
  async addCategory(categoryData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/categories`, categoryData);
      return response.data;
    } catch (error) {
      console.error("Error adding category:", error);
      throw error;
    }
  },

  // 删除类别
  async deleteCategory(categoryId) {
    try {
      await axios.delete(`${API_BASE_URL}/api/categories/${categoryId}`);
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },

  // 更新类别
  async updateCategory(categoryId, newName) {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/categories/${categoryId}`, { name: newName });
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  },

  // 添加子类别
  async addSubcategory(subcategoryData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/subcategories`, subcategoryData);
      return response.data;
    } catch (error) {
      console.error("Error adding subcategory:", error);
      throw error;
    }
  },

  // 删除子类别
  async deleteSubcategory(subcategoryId) {
    try {
      await axios.delete(`${API_BASE_URL}/api/subcategories/${subcategoryId}`);
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      throw error;
    }
  },

  // 更新子类别
  async updateSubcategory(subcategoryId, newName) {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/subcategories/${subcategoryId}`, { name: newName });
      return response.data;
    } catch (error) {
      console.error("Error updating subcategory:", error);
      throw error;
    }
  },

  // 添加新产品
  async addProduct(productData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/products`, productData);
      return response.data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  },

  // 更新产品
  async updateProduct(product) {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/products/${product.pid}`, product);
      return response.data;
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  // 删除产品
  async deleteProduct(productId) {
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${productId}`);
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },

  async uploadImage(formData) {
    console.log("Uploading image with FormData:", formData.get("file")); // 调试日志
    try {
      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Upload response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },
};

export default api;