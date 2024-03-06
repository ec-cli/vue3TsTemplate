<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-08 14:20:19
-->
<template>
  <el-breadcrumb class="app-breadcrumb">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span
        class="no-redirect"
        v-if="item.redirect == 'noRedirect' || index == breadcrumbs.length - 1"
        >{{ item.meta.title }}</span
      >
      <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { RouteLocationMatched } from "vue-router"
import { compile } from "path-to-regexp"

const breadcrumbs = ref<RouteLocationMatched[]>([])

const route = useRoute()
const router = useRouter()

const getBreadcrumb = () => {
  breadcrumbs.value = route.matched.filter((item) => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false
  })
}

const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect as string)
    return
  }
  router.push(pathCompile(path))
}

const pathCompile = (path: string) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}

watch(
  () => route.path,
  (path) => {
    if (path.startsWith("/redirect/")) {
      return
    }
    getBreadcrumb()
  }
)

getBreadcrumb()
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: var(--fp-navigationbar-height);
  .no-redirect {
    color: #97a8be;
    cursor: pointer;
  }
}
</style>