<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-08 14:19:59
-->
<template>
  <div @click="toggleClick">
    <el-icon class="icon" :size="20">
      <Fold v-if="props.isActive" />
      <Expand v-else />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(["toggle-click"])

const toggleClick = (e: MouseEvent) => {
  emit("toggle-click")
}
</script>

<style lang="scss" scoped>
.icon {
  vertical-align: middle;
}
</style>