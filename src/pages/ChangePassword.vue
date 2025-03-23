<template>
    <div class="change-password-container">
        <h2>Change Password</h2>
        <el-form @submit.prevent="handleChangePassword" label-width="100px">
            <el-form-item label="Old Pswd">
                <el-input v-model="oldPassword" type="password" show-password />
            </el-form-item>
            <el-form-item label="New Pswd">
                <el-input v-model="newPassword" type="password" show-password />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleChangePassword">Submit</el-button>
            </el-form-item>
        </el-form>
        <p v-if="message">{{ message }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api'

const oldPassword = ref('')
const newPassword = ref('')
const message = ref('')

const handleChangePassword = async () => {
    try {
        const res = await api.changePassword(oldPassword.value, newPassword.value)
        message.value = res.data || 'Password changed successfully!'
        oldPassword.value = ''
        newPassword.value = ''
        localStorage.removeItem('user')

        // 跳转到登录页面
        window.location.href = '/login'
    } catch (err) {
        message.value = err.response?.data || 'Password change failed'
    }
}
</script>

<style scoped>
.change-password-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}
</style>