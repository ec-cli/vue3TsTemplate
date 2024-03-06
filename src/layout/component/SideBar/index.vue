<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-07 15:50:56
-->
<template>
  <div class="has-logo">
    <SidebarLogo :collapse="isCollapse"></SidebarLogo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="fpSidebarMenuBgColor"
        :text-color="fpSidebarMenuTextColor"
        :active-text-color="fpSidebarMenuActiveTextColor"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in permissionStore.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        ></SidebarItem>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SidebarLogo from "./SidebarLogo.vue"
import SidebarItem from "./SidebarItem.vue"
import { useAppStore } from "@/store/modules/app"
import { usePermissionStore } from "@/store/modules/permission"
import { useSettingsStore } from "@/store/modules/settings"
import { getCssVariableValue } from "@/utils"

const appStore = useAppStore()
const route = useRoute()
const permissionStore = usePermissionStore()
const settingsStore = useSettingsStore()

const fpSidebarMenuBgColor = getCssVariableValue("--fp-sidebar-menu-bg-color")
const fpSidebarMenuTextColor = getCssVariableValue("--fp-sidebar-menu-text-color")
const fpSidebarMenuActiveTextColor = getCssVariableValue("--fp-sidebar-menu-active-text-color")

const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) {
    return meta.activeMenu
  }
  return path
})
const isCollapse = computed(() => {
  return !appStore.sidebar.opened
})
</script>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background: var(--fp-sidebar-menu-tip-line-bg-color);
  }
}
.has-logo {
  .el-scrollbar {
    height: calc(100% - var(--fp-header-height));
  }
}
.el-scrollbar {
  height: 100%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item) {
  height: var(--fp-sidebar-menu-item-height);
  line-height: var(--fp-sidebar-menu-item-height);
  &.is-active,
  &:hover {
    background: var(--fp-sidebar-menu-hover-bg-color);
  }
  display: block;
  * {
    vertical-align: middle;
  }
}

:deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
}

.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: var(--fp-sidebar-menu-active-text-color) !important;
        @include tip-line;
      }
    }
  }
}
</style>