<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-08 14:21:26
-->
<template>
  <div @click="screenfullClick">
    <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import screenfull from "screenfull"

const props = defineProps({
  // 全屏的元素,默认时html
  element: {
    type: String,
    default: "html"
  }
})
const isFullscreen = ref<boolean>(false)

const screenfullClick = () => {
  const dom = document.querySelector(props.element) || undefined
  if (!screenfull.isEnabled) {
    ElMessage.warning("您的浏览器无法正常工作")
    return
  }
  screenfull.toggle(dom)
}
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
screenfull.on("change", change)

onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change)
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  font-size: 24px;
  margin-top: 4px;
  &:focus {
    outline: none;
  }
}
</style>