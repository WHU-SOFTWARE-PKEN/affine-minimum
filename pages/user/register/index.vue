<script setup lang="ts">
  import { ref } from 'vue'
  // import { InsertUser } from '~/composable/dbClient'

  const router = useRouter()


const username = ref('') 
const password = ref('')
const password2 = ref('')

  async function registerUser(Name:string, Password:string) {
  try {
    await $fetch('/api/Insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Name, Password }),
    });
  } catch (error) {
    console.error('Error during user registration:', error);
  }
}

async function Isukuser(Name:string) {
  
  console.log(Name)
  const data = await $fetch('/api/SelectTargetUsers', {
    params: { Name }
  })
  return data[0]
  
  console.log(data)
}

  async function handleRegister() {
    const uquser = await Isukuser(username.value)
    if(uquser||username.value==='undefined'){
      alert('username is used，please change your username')
    } 
    else if (password.value === password2.value && password.value !== '') {
        //注册成功
      console.log(password)
      await registerUser(username.value,password.value)
      console.log(password)
      alert('注册成功')
      router.push(`/user/login`)
    } else {
        //注册失败
        console.log(password)
        console.log(password2)
      alert('Invalid password!')
    }
  }

  async function goToLogin() {
    router.push(`/user/login`)
  }


</script>

<!-- <script setup>
import { sendReq } from "@/composable/sendReq";
import { InsertUser } from '~/composable/dbClient'

const {
  public: { postgresqlURL },
} = useRuntimeConfig();

// session & set session
const session= useSession();
const setSession = useSetSession;

// page state
const isLoading = ref(false);

// form state
const name = ref("");
const password2 = ref("");
const password = ref("");

// handle form submit
const handleRegister = async (e) => {
  e.preventDefault();
  if (name && password2 && password) {
    isLoading.value = true;

    await InsertUser({name,password});

    try {
      const { register, errors } = await sendReq(postgresqlURL, { body: JSON.stringify(registerQuery), headers: { "Content-Type": "application/json" } });

      // throw error if any
      if (errors) throw Error(errors);

      // set session, notify and navigate to the home page
      setSession(register);
      alert("Registeration successful!");
      navigateTo("/");
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }
};
</script> -->


<template>
    <div class="regis-container">
    <div class="regis-inner">
      <h2>Register</h2>
      <el-form>
        <el-form status-icon label-position="top">
          <el-form-item prop="username" label="设置用户名:">
            <el-input v-model="username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password" label="设置密码:">
            <el-input v-model="password" placeholder="请输入密码" show-password/>
          </el-form-item>
          <el-form-item prop="password" label="确认密码:">
            <el-input v-model="password2" placeholder="请再次输入相同密码" show-password/>
          </el-form-item>
        </el-form>
        <div class="btn-out">
          <el-button class="btn" type="success" @click="handleRegister()">注册</el-button>
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