<script setup lang="ts">
const router = useRouter()

async function handleOpenlogin() {
  router.push(`/user/login`)
}
</script>

<template>
    <div>
        <h1>Welcome to notebook</h1>
        <button @click="handleOpenlogin()">Login</button>
    </div>
</template>