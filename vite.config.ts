/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-02 10:31:23
 */
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import svgLoader from "vite-svg-loader"
import AutoImport from 'unplugin-auto-import/vite'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    base: "./",
    server: {
      /** 是否开启 HTTPS */
      https: false,
      /** 端口号 */
      port: 8081,
      /** 是否自动打开浏览器 */
      open: true,
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      /** 跨域设置允许 */
      cors: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src")
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader(),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/ // .vue
        ],
        imports: ['vue', 'vue-router', 'pinia'],
        eslintrc: {
          enabled: false, // 若没此json文件，先开启，生成后在关闭
          filepath: './.eslintrc-auto-import.json', // 设置eslintrc-auto-import.json生成路径 Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        resolvers: [
          /* ... */
        ],
        dts: 'types/auto-imports.d.ts' // 设置auto-import.d.ts生成路径 Default ./auto-imports.d.ts
      })
    ],
    build: {
      chunkSizeWarningLimit: 10000, // 消除触发警告的chunk，默认500k
      /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
      minify: "terser",
      /** 打包后静态资源目录 */
      assetsDir: "static",
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ["console.log"]
        },
        format: {
          /** 删除注释 */
          comments: false
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
  }
})
