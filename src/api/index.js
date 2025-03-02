import axios from "axios";

// 统一 API 根路径，使用环境变量
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://20.255.253.135:8080";

const api = {
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

  // 上传产品图片 (示例，具体实现要配合后端)
  async uploadProductImage(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },
};

export default api;