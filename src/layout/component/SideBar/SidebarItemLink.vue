<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-08 09:23:20
-->
<template>
  <a v-if="isExternal(props.to)" :href="props.to" target="_blank" rel="noopener">
    <slot />
  </a>
  <router-link v-else :to="props.to">
    <slot />
  </router-link>
</template>

<script setup lang="ts">
import { isExternal } from "@/utils/validate"

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
</script>