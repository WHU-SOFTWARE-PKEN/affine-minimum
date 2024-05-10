<script setup lang="ts">
  import { ref } from 'vue'

  const router = useRouter()

  const username = ref('')
  const password = ref('')
  
  
</script>




<template>
    <div class="regis-container">
    <div>
      <h2>Register</h2>
      <form>
        <label for="username">Username:</label>
        <input type="text" id="username">
        <label for="password">Password:</label>
        <input type="password" id="password">
        <label for="password">Password again:</label>
        <input type="password" id="password">
        <button>注册</button>
      </form>
      
    </div>
    </div>
  </template>

<style scoped>
.regis-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
form {
  display: flex;
  flex-direction: column;
}
label {
  margin-bottom: 5px;
}
input {
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
button {  
  padding: 10px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
