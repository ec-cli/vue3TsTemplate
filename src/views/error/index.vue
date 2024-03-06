<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 16:30:33
-->
<template>
  <div class="error-box">
    <div class="img img1" :class="{ hide: hide }" v-if="state == '500'"></div>
    <div class="img img2" :class="{ hide: hide }" v-else></div>
    <p :class="{ hide: hide }" v-if="state === '500'">
      Error(500)，服务器内部错误，请联系系统管理员！
    </p>
    <p :class="{ hide: hide }" v-else>对不起，您访问的页面不存在！</p>
    <br />
    <el-button
      type="text"
      icon="el-icon-back"
      size="small"
      :class="{ hide: hide }"
      @click="handleClick"
      >返回首页</el-button
    >
  </div>
</template>
<script setup lang="ts">
const hide = ref<boolean>(true)
const state = ref<string>("500")
const route = useRoute()
const router = useRouter()

const handleClick = () => {
  router.push("/")
}
onMounted(() => {
  let status = route.query.type || 400
  state.value = status.toString()
  setTimeout(() => {
    hide.value = false
  }, 1000)
})
</script>

<style lang="scss" scoped>
.error-box {
  padding: 80px 0;
  margin: 0 auto;
  text-align: center;
  p {
    margin-top: -10px;
    font-size: 16px;
    color: #fff;
    transform: translateY(0);
    transition: all 0.3s;
    opacity: 1;
    &.hide {
      transform: translateY(50%);
      opacity: 0;
    }
  }
  .img {
    width: 600px;
    height: 450px;
    margin: 0 auto;

    transform: scale(1);
    transition: all 0.3s;
    opacity: 1;
    &.hide {
      transform: scale(0.4);
      opacity: 0;
    }
    &.img1 {
      background: url(../../assets/imgs/500.png) no-repeat center / 480px;
    }
    &.img2 {
      background: url(../../assets/imgs/404.png) no-repeat center / 480px;
    }
  }
  .el-button {
    transform: translateY(0);
    transition: all 0.3s;
    opacity: 1;
    &.hide {
      transform: translateY(50%);
      opacity: 0;
    }
  }
}
</style>