/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 17:42:14
 */

import request from "@/api"
import * as T from "@/api/interface/login" 

// 登录并返回token
export function loginApi(params: T.IloginData) {
    return request.post("users/login",params)
}