<template>
    <div class="login-container">
        <h2>Admin Login</h2>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model.trim="email" required placeholder="Enter your email" />
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model.trim="password" required
                    placeholder="Enter your password" />
            </div>

            <button type="submit">Login</button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import api from "@/api";
export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "",
        };
    },
    methods: {
        async login() {
            try {
                console.log(this.$router);
                const response = await api.login(this.email, this.password);
                console.log("111");
                console.log(response.user.is_admin);
                // 根据用户角色跳转
                if (response.user.is_admin) {
                    console.log(222);
                    await this.$router.push("/admin"); // 管理员跳转到 Admin Panel
                } else {
                    await this.$router.push("/"); // 普通用户跳转到产品页面
                    window.location.reload();  // 刷新页面
                }
            } catch (error) {
                this.errorMessage = error.message;
            }
        },
    },
};
</script>
<style scoped>
.login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    display: block;
}

input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background: #218838;
}

.error {
    color: red;
    text-align: center;
    margin-top: 10px;
}
</style>