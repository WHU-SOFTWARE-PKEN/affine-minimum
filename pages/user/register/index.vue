<script setup lang="ts">
  import { ref } from 'vue'
  import { InsertUser } from '~/composables/dbClient'

  const router = useRouter()

  const form = ref({
    username: '',
    password : '',
    password2 : ''
  })

  async function regis() {
    if (form.value.password === form.value.password2 && form.value.password !== '') {
        //注册成功
      console.log(form.value.password)
      await InsertUser(form.value.username,form.value.password)
      alert('Login successful!')
      router.push(`/user/login`)
    } else {
        //注册失败
      alert('Invalid password!')
    }
  }

  async function goToLogin() {
    router.push(`/user/login`)
  }


</script>




<template>
    <div class="regis-container">
    <div class="regis-inner">
      <h2>Register</h2>
      <el-form>
        <el-form status-icon label-position="top">
          <el-form-item prop="username" label="设置用户名:">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password" label="设置密码:">
            <el-input v-model="form.password" placeholder="请输入密码" show-password/>
          </el-form-item>
          <el-form-item prop="password" label="确认密码:">
            <el-input v-model="form.password2" placeholder="请再次输入相同密码" show-password/>
          </el-form-item>
        </el-form>
        <div class="btn-out">
          <el-button class="btn" type="success" @click="regis()">注册</el-button>
        </div> 
        <div class="btn-out">
          <el-button class="btn" type="primary" @click="goToLogin()">已有账号？登录</el-button>
        </div>
      </el-form>
      
    </div>
    </div>
  </template>

  <style scoped>
  .regis-container {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    background-color: #f9f9f9;
  }
  
  .regis-inner{
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 100%;
    max-width: 350px;
    margin: 150px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    border-radius: 8px;
  }
    .btn-out{
      width: 200px;
      margin: 10px;
      display: flex;
    } 
      .btn{
        width: 100%;
      }

  h2 {
    text-align: center;
    margin-bottom: 10px;
    padding: 7px;
    width: 100%;
    max-width: 120px; 
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    background-color: #fff;
    border-radius: 8px;
  }
 
  
  </style>