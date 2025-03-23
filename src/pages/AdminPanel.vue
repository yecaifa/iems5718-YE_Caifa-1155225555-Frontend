<template>
  <div class="admin-panel">
    <header>
      <h2>Admin Panel</h2>
      <button class="back-home" @click="$router.push('/')">Back to Home</button>
    </header>

    <!-- 🔹 Category 管理 -->
    <section class="section-card">
      <h3>Manage Categories</h3>

      <!-- 添加 Category -->
      <div class="form-group">
        <input 
        class="input" 
        v-model.trim="newCategoryName"
        placeholder="Enter category name"
        :pattern="patterns.textOnly" required />
        <button @click="addCategory">➕ Add Category</button>
      </div>

      <!-- Category 列表 -->
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.catid">
            <td>{{ category.catid }}</td>
            <td>{{ category.name }}</td>
            <td>
              <button @click="startEditingCategory(category)">✏️ Edit</button>
              <button class="delete-btn" @click="deleteCategory(category.catid)">🗑️ Delete</button>
              <button @click="toggleSubcategoryPanel(category)">📂 Manage Subcategories</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 🔹 Subcategory 管理（点击按钮展开） -->
    <section v-if="selectedCategoryForSub" class="section-card">
      <h3>Manage Subcategories for {{ selectedCategoryForSub.name }}</h3>
      <div class="form-group">
        <input 
        v-model.trim="newSubcategoryName" 
        placeholder="Enter subcategory name" 
        :pattern="patterns.textOnly" required />
        <button @click="addSubcategory">➕ Add Subcategory</button>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="subcategory in subcategories" :key="subcategory.subcatid">
            <td>{{ subcategory.subcatid }}</td>
            <td>{{ subcategory.name }}</td>
            <td>
              <button @click="startEditingSubcategory(subcategory)">✏️ Edit</button>
              <button class="delete-btn" @click="deleteSubcategory(subcategory.subcatid)">🗑️ Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 🔹 添加产品 -->
    <section class="section-card">
      <h3>Add Product</h3>

      <div class="form-group">
        <label>Category:</label>
        <select v-model="selectedCategoryId" @change="fetchSubcategories">
          <option value="">Select Category</option>
          <option v-for="category in categories" :key="category.catid" :value="category.catid">
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Subcategory:</label>
        <select v-model="selectedSubcategoryId" :disabled="!subcategories.length">
          <option value="">Select Subcategory</option>
          <option v-for="subcategory in subcategories" :key="subcategory.subcatid" :value="subcategory.subcatid">
            {{ subcategory.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Name:</label>
        <input v-model.trim="newProduct.name" placeholder="Enter product name" 
        :pattern="patterns.textOnly" required />
      </div>

      <div class="form-group">
        <label>Price:</label>
        <input v-model.trim="newProduct.price" type="number" placeholder="Enter price" 
        :pattern="patterns.price" required />
      </div>

      <div class="form-group">
        <label>Description:</label>
        <textarea v-model="newProduct.description" maxlength="200" placeholder="Enter description"></textarea>
      </div>
      <!-- 🔥 文件上传 -->
      <div class="form-group">
        <label>Upload Product Image (jpg/gif/png, max 10MB):</label>
        <input type="file" @change="handleFileUpload" accept="image/png, image/jpeg, image/gif" />
      </div>

      <button @click="addProduct">➕ Add Product</button>
    </section>
    <!-- 🔹 产品列表 -->
    <section class="section-card">
      <h3>Product List</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name & Image</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.pid" :class="{ 'alternate-row': product.pid % 2 === 0 }">
            <td>{{ product.pid }}</td>
            <td>
              <img :src="product.imageUrl" alt="Product Image" class="product-img" />
              <div>{{ product.name }}</div>
            </td>
            <td>
              <!-- Category Dropdown -->
              <select v-model="product.selectedCategory" @change="updateProductCategory(product)">
                <option v-for="category in categories" :key="category.catid" :value="category.catid">
                  {{ category.name }}
                </option>
              </select>
            </td>
            <td>
              <!-- Subcategory Dropdown -->
              <select v-model="product.selectedSubcategory" :disabled="!product.selectedCategory"
                @change="updateProductSubcategory(product)">
                <option v-for="subcategory in product.subcategories" :key="subcategory.subcatid"
                  :value="subcategory.subcatid">
                  {{ subcategory.name }}
                </option>
              </select>
            </td>
            <td>
              <input class="price-input" v-model="product.price" type="number" min="0.01"
              step="0.01" placeholder="Enter price" @blur="updateProduct(product)" />
            </td>
            <td>
              <textarea v-model="product.description" placeholder="Enter description"
                @blur="updateProduct(product)"></textarea>
            </td>
            <td>
              <!-- <button @click="startEditingProduct(product)">✏️ Edit</button> -->
              <button class="delete-btn" @click="deleteProduct(product.pid)" >🗑️ Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

---

<script>
import axios from "axios";
import api from "@/api";
export default {
  data() {
    return {
      categories: [],
      subcategories: [],
      products: [],
      newCategoryName: "",
      newSubcategoryName: "",
      selectedCategoryForSub: null,
      selectedCategoryId: "",
      selectedSubcategoryId: "",
      newProduct: {
        name: "",
        price: "",
        description: "",
        imageFile: null,
      },
      patterns: {
        textOnly: "^[a-zA-Z0-9 ]{3,50}$", // 只能输入字母、数字、空格，限制3-50字符
        price: "^[0-9]+(\\.[0-9]{1,2})?$" // 只能输入整数或小数（最多两位小数）
      },
    };
  },
  methods: {
    async loadCategories() {
      try {
        this.categories = await api.fetchCategories();
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    },
    async loadProducts() {
      const res = await api.fetchProducts();
      console.log(res)
      this.products = res.map((product) => ({
        ...product,
        selectedCategory: product.subcategory?.category?.catid || null,
        selectedSubcategory: product.subcategory?.subcatid || null,
        subcategories: [], // To be populated when category is selected
      }));
      this.products.forEach((product) => {
        if (product.selectedCategory) {
          this.loadSubcategoriesForProduct(product);
        }
      });
    },

    async loadSubcategoriesForProduct(product) {
      const res = await api.fetchSubcategories(product.selectedCategory);
      product.subcategories = res;
    },

    updateProductCategory(product) {
      if (!product.selectedCategory) {
        product.subcategories = [];
        product.selectedSubcategory = null;
      } else {
        // 获取选中的 category 对象
        const selectedCategory = this.categories.find(cat => cat.catid === product.selectedCategory);
        if (selectedCategory) {
          product.categoryName = selectedCategory.name; // 存入 category 名字
        }
        this.fetchSubcategoriesForProduct(product);
      }
      this.updateProduct(product);
    },

    updateProductSubcategory(product) {
      this.updateProduct(product);
    },

    async updateProduct(product) {
      if (!product.selectedCategory || !product.selectedSubcategory) return;

      // 获取选中的 category 对象
      const selectedCategory = this.categories.find(cat => cat.catid === product.selectedCategory);
      const selectedSubcategory = product.subcategories.find(sub => sub.subcatid === product.selectedSubcategory);

      const updatedProduct = {
        pid: product.pid,
        subcategory: {
          subcatid: product.selectedSubcategory,
          category: {
            catid: product.selectedCategory,
            name: selectedCategory ? selectedCategory.name : ""  // 传递 category name
          },
          name: selectedSubcategory ? selectedSubcategory.name : ""  // 传递 subcategory name
        },
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl
      };

      console.log("Updating product:", updatedProduct);

      try {
        await api.updateProduct(updatedProduct);
        // await axios.put(`http://localhost:8080/api/products/${product.pid}`, updatedProduct);
        alert("Product updated successfully!");
        this.loadProducts(); // 重新获取产品数据
      } catch (error) {
        console.error("Failed to update product:", error);
        alert("Failed to update product.");
      }
    },

    async startEditingProduct(product) {
      if (!product.selectedCategory || !product.selectedSubcategory) return;

      const updatedProduct = {
        pid: product.pid,
        subcategory: {
          subcatid: product.selectedSubcategory,
          category: {
            catid: product.selectedCategory,
            name: product.selectedCategory.name
          },
          name: product.selectedSubcategory.name,
        },
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
      };

      try {
        await api.updateProduct(updatedProduct);
        alert("Product updated successfully!");
        this.loadProducts(); // 重新获取产品数据
      } catch (error) {
        console.error("Failed to update product:", error);
        alert("Failed to update product.");
      }
    },

    async deleteProduct(pid) {
      await api.deleteProduct(pid);
      // await axios.delete(`http://localhost:8080/api/products/${pid}`);
      this.loadProducts(); // Re-fetch products after deletion
    },

    async addCategory() {
      if (!this.newCategoryName) return;
      const categoryData = { name: this.newCategoryName };
      await api.addCategory(categoryData)
      // await axios.post("http://localhost:8080/api/categories", categoryData);
      this.newCategoryName = "";
      this.loadCategories();
    },

    async deleteCategory(catId) {
      await api.deleteCategory(catId);
      // await axios.delete(`http://localhost:8080/api/categories/${catId}`);
      this.loadCategories();
    },

    startEditingCategory(category) {
      const newName = prompt("Edit category name", category.name);
      if (newName) {
        api.updateCategory(category.catid, newName)
        // axios.put(`http://localhost:8080/api/categories/${category.catid}`, { name: newName });
        this.loadCategories();
      }
    },

    async toggleSubcategoryPanel(category) {
      if (this.selectedCategoryForSub?.catid === category.catid) {
        this.selectedCategoryForSub = null; // 关闭
        this.subcategories = [];
      } else {
        this.selectedCategoryForSub = category;
        const res = await api.fetchSubcategories(category.catid);
        // const res = await axios.get(`http://localhost:8080/api/categories/${category.catid}/subcategories`);
        this.subcategories = res;
      }
    },

    async addSubcategory() {
      if (!this.newSubcategoryName || !this.selectedCategoryForSub) return;

      // 构建请求体，将 category 的 catid 和子分类的 name 传递
      const subcategoryData = {
        category: {
          catid: this.selectedCategoryForSub.catid
        },
        name: this.newSubcategoryName
      };

      // 发送 POST 请求到后端
      await api.addSubcategory(subcategoryData);
      // await axios.post('http://localhost:8080/api/subcategories', subcategoryData);

      // 清空输入框
      this.newSubcategoryName = "";

      // 切换面板显示
      this.toggleSubcategoryPanel(this.selectedCategoryForSub);
    },

    async deleteSubcategory(subcatId) {
      await api.deleteSubcategory(subcatId);
      // await axios.delete(`http://localhost:8080/api/subcategories/${subcatId}`);
      this.toggleSubcategoryPanel(this.selectedCategoryForSub);
    },

    startEditingSubcategory(subcategory) {
      const newName = prompt("Edit subcategory name", subcategory.name);
      if (newName) {
        api.updateSubcategory(subcategory.subcatid, newName);
        // axios.put(`http://localhost:8080/api/subcategories/${subcategory.subcatid}`, { name: newName });
        this.toggleSubcategoryPanel(this.selectedCategoryForSub);
      }
    },

    // 处理文件上传
    handleFileUpload(event) {
      const file = event.target.files[0];
      console.log("Selected file:", file);
      if (file) {
        if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
          alert("Only JPG, PNG, and GIF formats are allowed!");
          return;
        }
        if (file.size > 10 * 1024 * 1024) { // 10MB 限制
          alert("File size must be ≤ 10MB!");
          return;
        }
        this.newProduct.imageFile = file;
      }
    },
    async addProduct() {
      if (!this.newProduct.name || !this.newProduct.price || !this.newProduct.description || !this.newProduct.imageFile) {
        alert("Please fill in all fields and select an image.");
        return;
      }

      try {
        // 1️⃣ **上传图片**
        const formData = new FormData();
        formData.append("file", this.newProduct.imageFile);
        console.log("Uploading file:", this.newProduct.imageFile);  // 确保不为空
        const uploadResponse = await api.uploadImage(formData); // 发送至后端
        console.log("Upload Response:", uploadResponse);
        if (!uploadResponse || !uploadResponse.imageUrl) {
          alert("Image upload failed.");
          return;
        }

        // 2️⃣ **创建产品**
        const selectedCategory = this.categories.find(cat => cat.catid === this.selectedCategoryId);
        const selectedSubcategory = this.subcategories.find(sub => sub.subcatid === this.selectedSubcategoryId);

        const productData = {
          subcategory: {
            subcatid: this.selectedSubcategoryId,
            category: {
              catid: this.selectedCategoryId,
              name: selectedCategory ? selectedCategory.name : "" // 添加 category name
            },
            name: selectedSubcategory ? selectedSubcategory.name : "", // 添加 subcategory name
          },
          name: this.newProduct.name,
          price: this.newProduct.price,
          description: this.newProduct.description,
          imageUrl: uploadResponse.imageUrl, // 服务器返回的 URL
        };

        await api.addProduct(productData); // 发送至后端
        alert("Product added successfully!");
        this.newProduct = { name: "", price: "", description: "", imageFile: null };
        this.selectedCategoryId = "";
        this.selectedSubcategoryId = "";
        this.loadProducts(); // 刷新产品列表
      } catch (error) {
        console.error("Failed to add product:", error);
        alert("Failed to add product.");
      }
    },
    async fetchSubcategories() {
      if (!this.selectedCategoryId) {
        this.subcategories = [];
        return;
      }
      const res = await api.fetchSubcategories(this.selectedCategoryId);
      // const res = await axios.get(`http://localhost:8080/api/categories/${this.selectedCategoryId}/subcategories`);
      this.subcategories = res;
    },
  },
  mounted() {
    this.loadCategories();
    this.loadProducts();
  },
};
</script>


<style scoped>
.admin-products {
  max-width: 80%;
  margin: 30px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.8rem;
  text-align: center;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.section-card {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
}

.form-group {
  margin: 10px 0;
}

select,
input,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

button {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #218838;
}

.delete-btn {
  background: #dc3545;
  margin-left: 20px;
  margin-right: 20px;
}

.delete-btn:hover {
  background: #c82333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

.product-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
}

.description-cell {
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.input {
  width: 40%;
  padding: 10px;
  margin-right: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.price-input {
  width: 90%; /* 适当调整 */
  text-align: right;
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  width: 100%;
  min-height: 80px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical; /* 允许调整高度 */
}
</style>