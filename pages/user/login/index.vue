<script setup lang="ts">
  import { ref } from 'vue'

  const router = useRouter()
  const cookie_username = useCookie('user')
  const username = ref('')
  const password = ref('')


//判断有无用户前端api
async function beforelogin(Name:string,Password:string) {
  console.log(Name+'name')
  const target = await $fetch('/api/CheckUsernameAndPassword', {
    params: { Name,Password }
  })
  return target
}

async function login() {
  const exist = await beforelogin(username.value,password.value)
  if(exist){ //登陆成功
      //设置cookie
      cookie_username.value = username.value
      console.log(cookie_username.value+'cookiesucc')
      alert('Login successful!')
      //跳转
      router.push(`/workspace`)
    } else {
        //登陆失败
        console.log(cookie_username.value+'cookiefailed')
      alert('Invalid username or password!')
    }
  }
async function goToRegister() {
    router.push(`/user/register`)
}

</script>

<template>
    <div class="login-container">
      <div class="login-inner">
        <h2>Log in</h2>
        <el-form status-icon label-position="top">
          <el-form-item prop="username" label="账      户:">
            <el-input v-model="username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password" label="密      码:">
            <el-input v-model="password" placeholder="请输入密码" show-password/>
          </el-form-item>
        </el-form>
        <div class="btn-out">
          <el-button class="btn" type="success" @click="login()">登录</el-button>
        </div> 
        <div class="btn-out">
          <el-button class="btn" type="primary" @click="goToRegister()">没有账号？注册</el-button>
        </div>
      </div>
    </div>
  </template>


  <style scoped>
  .login-container {
    display: flex;
    min-height: 100vh;
    justify-content: center;
    background-color: #f9f9f9;
  }
  
  .login-inner{
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
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