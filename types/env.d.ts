/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 11:43:22
 */
/// <reference types="vite/client"/>

/** 声明 vite 环境变量的类型（如果未声明则默认是 any） */
declare interface ImportMetaEnv {
    readonly VITE_BASE_API: string
}