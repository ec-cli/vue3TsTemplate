/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 12:21:30
 */

import {ref} from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import {getToken,removeToken,setToken} from "@/utils/cache/localStorage"
import router, {resetRouter} from "@/router"
import {type IloginData,loginApi,getUserInfoApi} from "@/api/modules/login/login"

export const useUserStore = defineStore("user",() => {
    const token = ref<string>(getToken() || "")
    const roles = ref<string[]>([])
    const username = ref<string>("")

    // 设置角色数组
    const setRoles = (value: string[]) => {
        roles.value = value
    }

    // 登录
    const login = (loginData: IloginData) => {
        return new Promise((resolve,reject) => {
            loginApi({username: loginData.username,password: loginData.password,code: loginData.code}).then((res:any) => {
                setToken(res.data.token)
                token.value = res.data.token
                resolve(true)
            }).catch((err:any) => {
                reject(err)
            })
        })
    }
    // 获取用户详情
    const getInfo = () => {
        return new Promise((resolve,reject) => {
            let res = {username:"admin",roles: ["admin"]};
            roles.value = ["admin"]
            username.value = "admin"
            resolve(res)
        })
        // return new Promise((resolve,reject) => {
        //     getUserInfoApi().then((res:any) => {
        //         roles.value = res.data.roles
        //         username.value = res.data.username
        //         resolve(res)
        //     }).catch((err:any) => {
        //         reject(err)
        //     })
        // })
    }
    // 退出登录
    const logout = () => {
        removeToken()
        token.value = ""
        roles.value = []
        resetRouter()
    }
    // 重置token
    const resetToken = () => {
        removeToken()
        token.value = ""
        roles.value = []
    }

    return {
        token,
        roles,
        username,
        setRoles,
        // login,
        getInfo,
        logout,
        resetToken
    }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
    return useUserStore(store)
}