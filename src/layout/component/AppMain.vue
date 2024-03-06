<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-07 15:43:35
-->
<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="key" />
      </transition>
    </router-view>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const key = computed(() => {
  return route.path
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - var(--fp-navigationbar-height));
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: var(--fp-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--fp-header-height));
  }
  .fixed-header + .app-main {
    padding-top: var(--fp-header-height);
  }
}
</style>