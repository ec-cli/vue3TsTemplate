/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-07 16:23:06
 */

import { getSidebarStatus, setSidebarStatus } from "@/utils/cache/localStorage"
import {ISidebar} from "../interface"

export const useAppStore = defineStore("app",() => {
    const sidebar: ISidebar = reactive({
        opened: getSidebarStatus() != "closed",
    })

    const toggleSidebar =() => {
        sidebar.opened = !sidebar.opened
        if (sidebar.opened) {
            setSidebarStatus("opened")
        } else {
            setSidebarStatus("closed")
        }
    }
    return { sidebar,toggleSidebar }
})