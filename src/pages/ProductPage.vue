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
                    id: 7,
                    name: "Levi's 501 Jeans",
                    price: 59,
                    category: "Clothes",
                    subcategory: "Men",
                    description: "Classic denim jeans with a timeless fit.",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsZjD8ovVWjrDUk6nqPvqtObzyRUhs4w1PVn95MiQfP88psLGMYkkk_8nYXMeqdNHPglLSkg&s",
                },
                {
                    id: 8,
                    name: "Zara Summer Dress",
                    price: 79,
                    category: "Clothes",
                    subcategory: "Women",
                    description: "Elegant summer dress perfect for casual outings.",
                    image: "data:image/jpeg;base64,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",
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
                {
                    id: 10,
                    name: "Nestlé Chocolate Bar",
                    price: 2,
                    category: "Groceries",
                    subcategory: "Snacks",
                    description: "Delicious milk chocolate for a sweet treat.",
                    image: "data:image/jpeg;base64,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",
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