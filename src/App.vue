<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-02 10:31:23
-->
<script setup lang="ts">
import zhCn from "element-plus/lib/locale/lang/zh-cn"

const locale = zhCn
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

