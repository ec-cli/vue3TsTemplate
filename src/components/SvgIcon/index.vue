<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 12:03:02
-->
<script setup lang="ts">
import { computed } from "@vue/runtime-core"

const props = defineProps({
  prefix: {
    type: String,
    default: "icon"
  },
  name: {
    type: String,
    required: true
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
}
</style>