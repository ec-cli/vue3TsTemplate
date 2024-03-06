/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 12:18:53
 */
import {type App} from "vue"
import {permission} from "./permission"

// 挂载自定义指令
export function loadDirectives(app:App) {
    app.directive("permission",permission)
}