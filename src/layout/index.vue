<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 16:25:22
-->
<template>
  <div class="app-wrapper" :class="classObj">
    <SideBar
      class="sidebar-container"
      :class="{ 'no-side': !showSidebar }"
      v-if="showSidebar"
    ></SideBar>
    <div :class="{ hasTagsView: showTagsView, 'no-side': !showSidebar }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader, 'no-side': !showSidebar }" class="head-container">
        <NavigationBar></NavigationBar>
        <TagsView v-if="showTagsView"></TagsView>
      </div>
      <AppMain></AppMain>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SideBar, NavigationBar, TagsView, AppMain } from "./component"
import { useSettingsStore } from "@/store/modules/settings"
import { useAppStore } from "@/store/modules/app"

const settingsStore = useSettingsStore()
const appStore = useAppStore()

const classObj = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened
  }
})

const showTagsView = computed(() => {
  return settingsStore.showTagsView
})

const fixedHeader = computed(() => {
  return settingsStore.fixedHeader
})

const showSidebar = computed(() => {
  return settingsStore.showSidebar
})
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
}
.sidebar-container {
  transition: width 0.28s;
  width: var(--fp-sidebar-width) !important;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  &.no-side {
    width: 0 !important;
  }
}
.main-container {
  min-height: 100%;
  transition: all 0.2s linear;
  margin-left: var(--fp-sidebar-width);
  position: relative;
  &.no-side {
    margin-left: 0 !important;
    transition: all 0.2s linear;
  }
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--fp-sidebar-width));
  transition: width 0.28s;
  &.no-side {
    width: 100%;
  }
}
.hideSidebar {
  .main-container {
    margin-left: var(--fp-sidebar-hide-width);
  }
  .sidebar-container {
    width: var(--fp-sidebar-hide-width) !important;
  }
  .fixed-header {
    width: calc(100% - var(--fp-sidebar-hide-width));
  }
}
</style>