<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-05 18:57:05
-->
<template>
  <div class="login-container">
    <div class="login-box">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
        <h2 class="loginTitle">欢迎使用</h2>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="账号" type="text" :prefix-icon="User">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            :prefix-icon="Lock"
            v-model="loginForm.password"
            show-password
            placeholder="密码"
          >
          </el-input>
        </el-form-item>
        <el-button
          :loading="loading"
          size="normal"
          type="primary"
          @click="handleLogin"
          style="width: 100%; margin-bottom: 30px"
          >登录</el-button
        >
        <p class="account_box">
          <span>账号: admin</span>
          <span>密码: 123456</span>
        </p>
      </el-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus"
import { setToken } from "@/utils/cache/localStorage"
import { User, Lock } from "@element-plus/icons-vue"
import { useToggle } from "@vueuse/shared"
import { useDark } from "@vueuse/core"

// 进入登录页默认是黑色主题，将主题切换到明亮
const isDark = useDark()
const toggleDark = useToggle()
const router = useRouter()

const loginForm = reactive({
  username: "",
  password: ""
})
const loading = ref<boolean>(false)
const redirect = ref(undefined)
const loginFormRef = ref<FormInstance | null>(null)
const loginRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
}

const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      if (loginForm.username == "admin" && loginForm.password == "123456") {
        setToken("12345")
        router.push("/")
        loading.value = false
      }
    } else {
      return false
    }
  })
}

onMounted(() => {
  // 手动去除进入登录页面默认的黑色主题
  //  document.querySelector("html")?.setAttribute("class", "")
  document.onkeydown = (e: any) => {
    e = window.event || e
    if (e.code == "Enter" || e.code == "enter" || e.code == "NumpadEnter") {
      if (loading.value) return
      handleLogin()
    }
  }
})
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;

.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .login-box {
    z-index: 10;
    .login-form {
      width: 450px;
      max-width: 100%;
      border-radius: 15px;
      background-clip: padding-box;
      padding: 15px 35px 15px 35px;
      background: #fefefe;
      margin: 0 auto;
      overflow: hidden;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #707070;
        font-size: 20px;
        font-weight: 700;
      }
      .tips {
        display: flex;
        justify-content: flex-end;
        font-size: 14px;
        margin-bottom: 10px;
        a {
          color: #707070;
        }
        span {
          &:first-of-type {
            margin-right: 16px;
          }
        }
      }
      .account_box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        span {
          color: #707070;
          font-size: 14px;
          &:first-of-type {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
