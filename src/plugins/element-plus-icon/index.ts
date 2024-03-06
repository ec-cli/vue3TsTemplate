/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 12:14:36
 */
import {type App} from "vue"
import * as ElementPlusIconVue from "@element-plus/icons-vue"

export function loadElementPlusIcon(app:App) {
    // 注册所有的element plus icon
    for (const [key,component] of Object.entries(ElementPlusIconVue)) {
        app.component(key,component)
    }
}