<script setup lang="ts">
  import { ref } from 'vue'
  import { user } from '~/server/database/schema';
  import { drizzle } from 'drizzle-orm/postgres-js';
  import * as schema from '~/server/database/schema';
//   import * as buffer from "buffer"; //引入buffer
 
// if (typeof (window as any).Buffer === "undefined") { // 判断当前环境是否有Buffer对象
//    (window as any).Buffer = buffer.Buffer; // Buffer对象不存在则创建导入的buffer
// }
  //window.Buffer = window.Buffer || Buffer;
  //import { userdb } from '~/composables/dbClient';
  import { eq } from 'drizzle-orm';
  
  const router = useRouter()

  const username = ref('')
  const password = ref('')

//   const db = drizzle(queryClient, { schema: schema });
  
// //搜索指定用户
// async function targetExisted(username: string, password: string)
// {
//   const Users = await db.select().from(user).where(eq(user.name,username))
//   const target = (Users[0].password==password)
//   return target
// }


// async function login() {
//   const exist = await targetExisted(username.value,password.value)
//   if(exist){
//         //登陆成功
//       alert('Login successful!')
//       router.push(`/workspace`)
//     } else {
//         //登陆失败
//       alert('Invalid username or password!')
//     }
//   }
// async function goToRegister() {
//     router.push(`/user/register`)
// }

async function login() {
    if (username.value === 'admin' && password.value === 'password') {
        //登陆成功
      alert('Login successful!')
      router.push(`/workspace`)
    } else {
        //登陆失败
      alert('Invalid username or password!')
    }
  }
  async function goToRegister() {
    router.push(`/user/register`)
}



</script>

<template>
    <div class="login-container">
      <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
          <button @click="goToRegister()">注册</button>
          <button type="submit">登录</button>
          
        </form>
      </div>
    </div>
  </template>




<style scoped>
  .login-container {
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
  