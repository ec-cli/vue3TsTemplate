/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 11:59:23
 */
import {createPinia} from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const store = createPinia()
store.use(piniaPluginPersistedstate);

export default store