/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-08 10:19:55
 */
import ILayoutSettings from "@/store/interface"
import piniaPersistConfig from "@/config/piniaPersist";

export const useSettingsStore = defineStore({
    id: "useSettingsStore",
    state: (): ILayoutSettings => ({
        fixedHeader: true,
        showTagsView: true,
        showSidebar: true,
        showThemeSwitch: true,
        showScreenfull: true
    }),
    actions: {
        setFixedHeader(isShow: boolean) {
            this.fixedHeader = isShow
        },
        setShowTagsView(isShow: boolean) {
            this.showTagsView = isShow
        },
        setShowSidebar(isShow: boolean) {
            this.showSidebar = isShow
        },
        setShowThemeSwitch(isShow: boolean) {
            this.showThemeSwitch = isShow
        },
        setShowScreenfull(isShow: boolean) {
            this.showScreenfull = isShow
        },
    },
    persist: piniaPersistConfig("useSettingsStore")
})
