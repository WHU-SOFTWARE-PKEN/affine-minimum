<script setup lang="ts">
import { text } from 'drizzle-orm/mysql-core';
import { useRouter } from 'vue-router'

const router = useRouter()

async function handleOpenlogin() {
  router.push(`/user/login`)
}

async function handleOpenRegi() {
  router.push(`/user/register`)
}

</script>

<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div class= "items-center justify-center">
          <p class="text-4xl font-bold text-indigo-600 mb-6">Hello，</p>
          <p class="text-4xl font-bold text-indigo-600 mb-6">LuoJia-PK-Notebook</p>
        </div>
        <div class="flex">
        <el-button type="primary"  @click="handleOpenlogin()" >
            Log In
        </el-button>
        <el-button type="primary" @click="handleOpenRegi()" >
          Sign Up
        </el-button>
      </div>
    </div>
</template>

<style scoped>
/* 可以在这里添加更多自定义CSS样式 */
</style>