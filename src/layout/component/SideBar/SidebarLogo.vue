<!--
 * @Description: logo
 * @Author: rk
 * @Date: 2022-12-07 16:07:25
-->
<template>
  <div class="sidebar-logo-container" :class="{ collapse: props.collapse }">
    <transition name="sidebar-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <div class="sidebar-logo">公司</div>
        <!-- <img src="@/assets/imgs/logo.png" alt="" class="sidebar-logo" /> -->
      </router-link>
      <router-link v-else key="expand" to="/">
        <div class="sidebar-logo-text">xxxx公司模板</div>
        <!-- <img src="@/assets/imgs/logo-text.png" alt="" class="sidebar-logo-text" /> -->
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  collapse: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: var(--fp-header-height);
  line-height: var(--fp-header-height);
  background-color: var(--fp-sidebarlogo-bg-color);
  text-align: center;
  overflow: hidden;
  .sidebar-logo {
    display: none;
  }
  .sidebar-logo-text {
    width: 200px;
    vertical-align: middle;
    color: #fff;
    font-size: 20px;
  }
}
.collapse {
  .sidebar-logo {
    width: 28px;
    height: 28px;
    // vertical-align: middle;
    display: inline-block;
    color: #fff;
    font-size: 12px;
  }
  .sidebar-logo-text {
    display: none;
  }
}
</style>
