<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-08 14:21:42
-->
<template>
  <el-switch
    v-model="isDark"
    @change="toggleDark"
    inline-prompt
    active-color="#0a0a0a"
    inactive-color="#dcdfe6"
    :active-icon="Sunny"
    :inactive-icon="Moon"
  />
</template>
<script setup lang="ts">
import { Sunny, Moon } from "@element-plus/icons-vue"

import { useToggle } from "@vueuse/shared"
import { useDark } from "@vueuse/core"

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>