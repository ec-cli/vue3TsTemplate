<!--
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-07 15:50:18
-->
<template>
  <div class="navigation-bar">
    <div class="left-menu">
      <Hamburger
        class="hamburger"
        :is-active="sidebar.opened"
        @toggle-click="toggleSidebar"
      ></Hamburger>
      <Breadcrumb class="breadcrumb"></Breadcrumb>
    </div>
    <div class="right-menu">
      <Screenfull class="right-menu-item" v-if="showScreenfull"></Screenfull>
      <ThemeSwitch class="right-menu-item" v-if="showThemeSwitch"></ThemeSwitch>
      <el-dropdown class="right-menu-item" @command="handleCommand">
        <div class="right-menu-avatar">
          <el-avatar :size="30" :icon="UserFilled" />
          <span>{{ userStore.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="userCenter"
              ><el-icon><Avatar /> </el-icon>个人中心</el-dropdown-item
            >
            <el-dropdown-item command="updatePassword"
              ><el-icon><Edit /></el-icon>修改密码</el-dropdown-item
            >
            <el-dropdown-item command="systemSetting"
              ><el-icon><Setting /></el-icon>系统设置</el-dropdown-item
            >
            <el-dropdown-item divided command="loginOut"
              ><el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <SystemSetting :systemDialog="systemDialog" v-if="systemDialog.visible"></SystemSetting>
  </div>
</template>

<script setup lang="ts">
import Hamburger from "../Hamburger/index.vue"
import Breadcrumb from "../Breadcrumb/index.vue"
import Screenfull from "@/components/Screenfull/index.vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import SystemSetting from "../SystemSetting/index.vue"
import { useAppStore } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"
import { useUserStore } from "@/store/modules/user"
import { ElMessageBox } from "element-plus"
import { UserFilled } from "@element-plus/icons-vue"

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()
const router = useRouter()

const systemDialog = reactive<Object>({
  visible: false
})

const sidebar = computed(() => {
  return appStore.sidebar
})

const showScreenfull = computed(() => {
  return settingsStore.showScreenfull
})
const showThemeSwitch = computed(() => {
  return settingsStore.showThemeSwitch
})

const handleCommand = (command: string | number | object) => {
  if (command == "userCenter") {
    //
  } else if (command == "updatePassword") {
    //
  } else if (command == "systemSetting") {
    systemDialog.visible = true
  } else if (command == "loginOut") {
    // 退出登录
    ElMessageBox.confirm("确定退出登录吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        userStore.logout()
        router.push("/login")
      })
      .catch(() => {})
  }
}
const toggleSidebar = () => {
  appStore.toggleSidebar()
}
</script>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--fp-navigationbar-height);
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .hamburger {
      height: 100%;
      padding: 0 15px;
      cursor: pointer;
    }
  }
  .right-menu {
    position: absolute;
    right: 10px;
    margin-right: 10px;
    color: #606266;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>