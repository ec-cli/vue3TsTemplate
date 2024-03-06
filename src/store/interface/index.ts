/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-08 10:22:18
 */
// 布局配置

export interface ILayoutSettings {
    // 是否显示侧边栏
    showSidebar: boolean
    // 是否固定header
    fixedHeader: boolean
    // 是否显示标签栏
    showTagsView: boolean
    // 是否显示切换主题
    showThemeSwitch: boolean
    // 是否显示全屏
    showScreenfull: boolean
}

export interface ISidebar {
    opened: boolean
}