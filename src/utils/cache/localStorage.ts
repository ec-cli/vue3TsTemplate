/*
 * @Description: localStorage
 * @Author: rk
 * @Date: 2022-12-06 16:50:30
 */
export const getToken = () => {
  return localStorage.getItem("token")
}
export const setToken = (token: string) => {
  localStorage.setItem("token", token)
}
export const removeToken = () => {
  localStorage.removeItem("token")
}

export const getSidebarStatus = () => {
  return localStorage.getItem("sidebar_status")
}
export const setSidebarStatus = (sidebarStatus: "opened" | "closed") => {
   localStorage.setItem("sidebar_status",sidebarStatus)
}
