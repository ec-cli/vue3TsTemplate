/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 12:09:52
 */
import {type App} from "vue"
import {loadElementPlus} from "./element-plus"
import {loadElementPlusIcon} from "./element-plus-icon"

export function loadPlugins(app:App) {
    loadElementPlus(app)
    loadElementPlusIcon(app)
}