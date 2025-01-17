<template>
    <main v-if="product">
        <div class="product-container">
            <div class="product-image">
                <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-info">
                <h1>{{ product.name }}</h1>
                <p class="category">Category: {{ mainCategory }} > {{ subCategory }}</p>
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
export default {
    data() {
        return {
            products: [
                {
                    id: 1,
                    name: "iPhone 15",
                    price: 999,
                    category: "Electronics",
                    subcategory: "Phones",
                    description: "Apple's latest smartphone with A16 chip.",
                    image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-model-unselect-gallery-1-202309?wid=5120&hei=2880&fmt=webp&qlt=70&.v=aVFiZEF4WDEvUWJNSU5HRDg4cklnTGdzSmpObkZCM3MrNmJ5SkhESlNDZ1UwRE05YU1MZ0lYWk55ZU5FOENXWkpFd0xhWDVibStLdGRYRmxkNGI4VTdpMGJRT0ppMjh4RlRZQkc0Q3FZZEI4UW55RWdXT3BFc2NrR2VEb1pCOGo&traceId=1",
                },
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
        mainCategory() {
            return this.$route.params.main;
        },
        subCategory() {
            return this.$route.params.sub;
        },
    },
    mounted() {
        const itemName = decodeURIComponent(this.$route.params.item).toLowerCase();
        console.log("Route Param (Raw):", this.$route.params.item);
        console.log("Processed Item Name:", itemName);

        this.product = this.products.find(
            (p) => p.name.toLowerCase() === itemName
        );

        if (!this.product) {
            console.error("Product not found for:", itemName);
        }
    },
    watch: {
        "$route.params.item": {
            immediate: true,
            handler(newItem) {
                const itemName = decodeURIComponent(newItem).toLowerCase();
                console.log("Route Change - New Item:", itemName);
                this.product = this.products.find(
                    (p) => p.name.toLowerCase() === itemName
                );
            },
        },
    },
    methods: {
        addToCart(product) {
            alert(`${product.name} added to cart!`);
        },
    },
};
</script>

<style scoped>
.product-container {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 20px;
}

.product-image img {
    width: 300px;
    height: auto;
    border-radius: 10px;
}

.product-info {
    max-width: 500px;
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