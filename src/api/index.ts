/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-05 19:26:35
 */
import axios, { AxiosRequestConfig,AxiosError,AxiosResponse } from "axios"
import NProgress from "nprogress"
import statusCode from "./statusCode"
import Q from "qs"
import { ElMessage } from "element-plus";

// 设置请求头和请求路径
const service = axios.create({
    timeout: 6000000,
    responseType: "json",
    baseURL: import.meta.env.VITE_BASE_API,
})

service.interceptors.request.use(
    (config :AxiosRequestConfig) => {
        let accessToken = window.localStorage.getItem("token");
        if (accessToken) {
            config.headers["Authorization"] = accessToken;
        }
        return config;
    },(error) => {
        return Promise.reject(error);
    })

// 响应拦截
service.interceptors.response.use(
    (response:AxiosResponse) => {
        const {data} = response
        return statusCode.status(data)
    },
    (error:AxiosError) => {
        let { message } = error;
        if (message == "Network Error") {
            message = "服务器连接异常！";
            // location.href = "/error?type=500"
        } else if (message.includes("timeout")) {
            message = "请求超时！";
        } else if (message.includes("Request failed with status code")) {
            message = "接口" + message.substr(message.length - 3) + "异常！";
        }
        ElMessage({
            message: message,
            type: "error",
            duration: 5 * 1000
        })
        return Promise.reject(error);
    }
);

interface ResType<T> {
    errorCode: number
    data?: T
    message?: string
    success?: boolean
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>
  post<T>(url: string, params?: unknown): Promise<ResType<T>>
  urlencodedPost<T>(url: string, params?: unknown): Promise<ResType<T>>
  upload<T>(url: string, params: unknown): Promise<ResType<T>>
  download(url: string): void
}

const request: Http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            service
                .get(url, { params })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data);
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err);
                });
        });
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            service
                .post(url, params)
                .then((res) => {
                    NProgress.done()
                    resolve(res.data);
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err);
                });
            });
    },
    // 请求头部是multipart/form-data，一般用于上传接口
    upload(url, file) {
        return new Promise((resolve, reject) => {
          NProgress.start()
          service
            .post(url, file, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((res) => {
              NProgress.done()
              resolve(res.data)
            })
            .catch((err) => {
              NProgress.done()
              reject(err.data)
            })
        })
    },
    download(url) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        iframe.onload = function () {
          document.body.removeChild(iframe)
        }
        document.body.appendChild(iframe)
    },
    // 请求头部是application/x-www-form-urlencoded需要用此方法
    urlencodedPost(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            service
                .post(url, Q.stringify(params), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data);
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err);
                });
            });
    },
};

export default request;

