/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-05 18:54:40
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const Layout = () => import("@/layout/index.vue")
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  //首页
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/register",
    component: () => import("@/views/login/register.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/error",
    component: () => import("@/views/error/index.vue"),
    meta: {
      hidden: true
    },
    // 常规参数只会匹配被 / 分隔的 URL 片段中的字符。如果想匹配任意路径，vue2使用* , vue3使用/:pathMatch(.*)
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/menu",
    component: Layout,
    redirect: "/menu/menu1",
    name: "Menu",
    meta: {
      title: "多级菜单",
      svgIcon: "menu"
    },
    children: [
      {
        path: "menu1",
        component: () => import("@/views/menu/menu1/index.vue"),
        redirect: "/menu/menu1/menu1-1",
        name: "Menu1",
        meta: {
          title: "一级菜单-1"
        },
        children: [
          {
            path: "menu1-1",
            component: () => import("@/views/menu/menu1/menu1-1/index.vue"),
            name: "Menu1-1",
            meta: {
              title: "二级菜单-1"
            }
          },
          {
            path: "menu1-2",
            component: () => import("@/views/menu/menu1/menu1-2/index.vue"),
            name: "Menu1-2",
            meta: {
              title: "二级菜单-2"
            }
          },
      
        ]
      },
      {
        path: "menu2",
        component: () => import("@/views/menu/menu2/index.vue"),
        name: "Menu2",
        meta: {
          title: "一级菜单-2"
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes:constantRoutes
})

// 重置路由
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach(route => {
      const {name,meta} = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch(err) {
    // 强制刷新浏览器
    window.location.reload()
  }
}
export default router
