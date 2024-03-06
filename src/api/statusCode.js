/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-14 17:14:34
 */
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { removeToken } from "@/utils/cache/localStorage"

const router = useRouter()

const statusCode = {
	//后端自定义状态码
	status(data) {
		if (data == null) {
			ElMessage({
				type: "error",
				message: "接口报错，请联系管理员！",
				center: true,
			});
			return false;
		}
		if (data.errorCode === 0) {
			if (data.data && JSON.stringify(data.data) !== "{}") {
				return data.data
			} else {
				return true
			}
		} else {
			switch (data.errorCode) {
				case 1900: //  token不存在，请重新登录
					router.push("/login")
					removeToken()
					ElMessage({
						type: "error",
						message: "登录超时，请重新登录！",
						center: true,
					});
					break;
				default:
					ElMessage({
						duration: 4000,
						type: "error",
						message: data.message || "请求出错！",
						center: true,
					});
					break;
			}
			return false;
		}

	},
	//http状态码
	response(code) {
		router.replace("/error?type=" + code);
	}
};
export default statusCode;
