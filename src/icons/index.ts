/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 12:02:02
 */
import {type App} from "vue"
import SvgIcon from "@/components/SvgIcon/index.vue"
// svg icons
import "virtual:svg-icons-register"

export function loadSvg(app: App) {
    app.component("SvgIcon",SvgIcon)
}