/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-06 10:52:27
 */
module.exports = {
  tabWidth: 2,
  jsxSingleQuote: true, // 在jsx中使用单引号代替双引号
  jsxBracketSameLine: true, // 在jsx中把'>' 是否单独放一行
  printWidth: 100, // 超过最大值换行
  semi: false, // 句尾添加分号
  /** 是否使用 Tab 格式化 */
  useTabs: false,
  /** 对象或者数组的最后一个元素后面不要加逗号 */
  trailingComma: "none",
  /** 箭头函数的参数无论有几个，都要括号包裹 */
  arrowParens: "always",
  overrides: [
    // json文件格式化
    {
      files: "*.json",
      options: {
        printWidth: 200
      }
    }
  ]
}
