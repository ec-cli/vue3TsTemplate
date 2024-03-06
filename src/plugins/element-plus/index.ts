/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 12:11:05
 */
import {type App} from "vue"
import ElementPlus from "element-plus"

export function loadElementPlus(app: App) {
    // Element Plus 组件完整引入
    app.use(ElementPlus)
}