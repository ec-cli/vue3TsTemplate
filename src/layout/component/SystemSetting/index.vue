<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-12 10:50:41
-->
<template>
  <div class="drawer-container">
    <el-drawer
      v-model="props.systemDialog.visible"
      title="系统配置"
      direction="rtl"
      size="350"
      :close-on-click-modal="false"
    >
      <el-divider border-style="dashed" />
      <div class="drawer-item">
        <span>显示标签栏</span>
        <el-switch v-model="settingsStore.showTagsView" />
      </div>
      <div class="drawer-item">
        <span>显示侧边栏</span>
        <el-switch v-model="settingsStore.showSidebar" />
      </div>
      <div class="drawer-item">
        <span>固定 Header</span>
        <el-switch v-model="settingsStore.fixedHeader" />
      </div>
      <div class="drawer-item">
        <span>显示切换主题按钮</span>
        <el-switch v-model="settingsStore.showThemeSwitch" />
      </div>
      <div class="drawer-item">
        <span>显示全屏按钮</span>
        <el-switch v-model="settingsStore.showScreenfull" />
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings"

const settingsStore = useSettingsStore()
const props = defineProps({
  systemDialog: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped>
.drawer-container {
  .drawer-item {
    font-size: 14px;
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
:deep(.el-drawer__header) {
  margin-bottom: 5px !important;
}
:deep(.el-switch) {
  height: 20px !important;
  line-height: 20px !important;
}
:deep(.el-divider--horizontal) {
  margin: 5px 0;
}
:deep(.el-drawer__body) {
  padding-top: 10px;
}
</style>