

/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 16:38:38
 */
import { RouteRecordRaw } from "vue-router"
const Layout = () => import("@/layout/index.vue")
export const asyncRoutes:RouteRecordRaw[] = [
    {
      path: "/system_manage",
      component: Layout,
      name: "SystemManage",
      redirect: "/system_manage/user",
      meta: {
        title: "系统管理",
        svgIcon: "system",
        roles: ["admin","editor"],
        alwaysShow: true
      },
      children: [
        {
          path: "user",
          component: () => import("@/views/systemManage/user/index.vue"),
          name: "user",
          meta: {
            title: "用户管理",
            svgIcon: "user",
          }
        },
        {
            path: "role",
            component: () => import("@/views/systemManage/role/index.vue"),
            name: "role",
            meta: {
              title: "角色管理",
              svgIcon: "role",
            }
          },
          {
            path: "menu",
            component: () => import("@/views/systemManage/menu/index.vue"),
            name: "menu",
            meta: {
              title: "菜单管理",
              svgIcon: "menu1",
            }
          },
      ]
    },
    {
      path: "/permission",
      component: Layout,
      name: "Permission",
      meta: {
        title: "权限管理",
        svgIcon: "lock",
        roles: ["admin","editor"],
        alwaysShow: true
      },
      children: [
        {
          path: "page",
          component: () => import("@/views/permission/page/index.vue"),
          name: "page",
          meta: {
            title: "页面权限",
            icon: "page",
            roles: ["admin","editor"],
          }
        },
        {
          path: "direction",
          component: () => import("@/views/permission/direction/index.vue"),
          name: "direction",
          meta: {
            title: "指令权限",
            icon: "direction"
          }
        }
      ]
    }
]