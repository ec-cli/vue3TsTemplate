<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 16:28:22
-->
<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()

router.replace({ path: "/" + route.params.path, query: route.query })
</script>