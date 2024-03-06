/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 12:01:03
 */
import router from "@/router"
import {useUserStoreHook} from "@/store/modules/user"
import {usePermissionStoreHook} from "@/store/modules/permission"
import {getToken} from "@/utils/cache/localStorage"
import {ElMessage} from "element-plus"
import asyncRouteSetting from "@/config/async-route"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const whiteList = ["/login", "/auth-redirect", "/forget_pwd", "/register"];
NProgress.configure({showSpinner: false})

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const userStore = useUserStoreHook()
    const permissionStore = usePermissionStoreHook()
    // 判断该用户是否登录
    if (getToken()) {
        if (to.path === "/login") {
            // 如果已经登录,并准备进入login页面,则重定向到主页
            next({path: "/"})
            NProgress.done()
        } else {
            // 检查用户是否已获取其权限角色
            if (userStore.roles.length === 0) {
                try {
                    if (asyncRouteSetting.open) {
                        
                        // 角色必须是一个数组
                        await userStore.getInfo();
                        const roles = userStore.roles
                        // 根据角色生成可访问的Routers
                        permissionStore.setRoutes(roles)
                    } else {
                        // 没有开启动态路由功能,则启用默认角色
                        userStore.setRoles(asyncRouteSetting.defaultRoles)
                        permissionStore.setRoutes(asyncRouteSetting.defaultRoles)
                    }
                    
                    // 将有访问权限的动态路由添加到Router中
                    permissionStore.dynamicRoutes.forEach(route => {
                        router.addRoute(route)
                    })
                    
                    // 确保添加路由已完成
                    // 设置replace:true,因此导航将不会留下历史记录
                    next({...to, replace: true})
                } catch (err:any) {
                    // 过程中发生任何错误,都直接重置token,并重定向到登录页面
                    userStore.resetToken()
                    ElMessage.error(err.msg || "路由守卫过程发生错误")
                    next("/login")
                    NProgress.done()
                }
            } else {
                next()
            }
        }
    } else {
        // 如果没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 如果在免登录的白名单中,则直接进入
            next()
        } else {
            // 其他没有访问权限的页面将被重定向到登录页面
            next("/login")
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})