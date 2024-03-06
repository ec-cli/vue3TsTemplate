/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 16:48:19
 */
import store from "@/store"
import { RouteRecordRaw } from "vue-router"
import { constantRoutes } from "@/router/index"
import { asyncRoutes } from "@/router/const"
const hasPermission = (roles: string[],route: RouteRecordRaw) => {
    if (route.meta && route.meta.roles) {
        return roles.some(role => {
            if (route.meta?.roles != undefined) {
                return route.meta.roles.includes(role)
            } else {
                return false
            }
        })
    } else {
        return false
    }
}

const filterAsyncRoutes = (routes: RouteRecordRaw[],roles:string[]) => {
    const res: RouteRecordRaw[] = []
    routes.forEach(route => {
        const r = {...route}
        if (hasPermission(roles,r)) {
            if (r.children) {
                r.children = filterAsyncRoutes(r.children,roles)
            }
            res.push(r)
        }
    })
    return res;
}

export const usePermissionStore = defineStore("permission",() => {
    const routes = ref<RouteRecordRaw[]>([])
    const dynamicRoutes = ref<RouteRecordRaw[]>([])

    const setRoutes = (roles: string[]) => {
        let accessedRoutes
        if (roles.includes("admin")) {
            accessedRoutes = asyncRoutes
        } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        routes.value = constantRoutes.concat(accessedRoutes)
        dynamicRoutes.value = accessedRoutes
    }
    return {routes,dynamicRoutes,setRoutes}
})

// 在setup外使用
export function usePermissionStoreHook() {
    return usePermissionStore(store)
}