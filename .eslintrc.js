/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-05 17:59:19
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: "vue-eslint-parser",
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/eslint-config-typescript",
    './.eslintrc-auto-import.json',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
      tsx: true
    }
  },
  rules: {
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // Prettier
    "prettier/prettier": "error",
    // 禁止出现console
    "no-console": "warn",
    // 禁用debugger
    "no-debugger": "warn",
    // 禁止出现重复的 case 标签
    "no-duplicate-case": "warn",
    // 禁止出现空语句块
    "no-empty": "warn",
    // 禁止不必要的括号
    "no-extra-parens": "off",
    // 禁止对 function 声明重新赋值
    "no-func-assign": "warn",
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    "no-unreachable": "warn",
    // 强制所有控制语句使用一致的括号风格
    curly: "warn",
    // 要求 switch 语句中有 default 分支
    "default-case": "warn",
    // 强制尽可能地使用点号
    "dot-notation": "warn",
    // 要求使用 === 和 !==
    eqeqeq: "warn",
    // 禁止出现空函数
    "no-empty-function": "warn",
    // 禁用不必要的嵌套块
    "no-lone-blocks": "warn",
    // 禁止使用多个空格
    "no-multi-spaces": "warn",
    // 禁止多次声明同一变量
    "no-redeclare": "warn",
    // 禁止在 return 语句中使用赋值语句
    "no-return-assign": "warn",
    // 禁用不必要的 return await
    "no-return-await": "warn",
    // 禁止自我赋值
    "no-self-assign": "warn",
    // 禁止自身比较
    "no-self-compare": "warn",
    // 禁止不必要的 catch 子句
    "no-useless-catch": "warn",
    // 禁止多余的 return 语句
    "no-useless-return": "warn",
    // 禁止变量声明与外层作用域的变量同名
    "no-shadow": "off",
    // 允许delete变量
    "no-delete-var": "off",
    // 强制数组方括号中使用一致的空格
    "array-bracket-spacing": "warn",
    // 强制在代码块中使用一致的大括号风格
    "brace-style": "warn",
    // 强制使用骆驼拼写法命名约定
    camelcase: "warn",
    // 强制使用一致的缩进
    indent: "off",
    // 禁止空格和 tab 的混合缩进
    "no-mixed-spaces-and-tabs": "warn",
    // 禁止出现多行空行
    "no-multiple-empty-lines": "warn",
    // 强制在块之前使用一致的空格
    "space-before-blocks": "warn",
    // 强制在圆括号内使用一致的空格
    "space-in-parens": "warn",
    // 要求操作符周围有空格
    "space-infix-ops": "warn",
    // 强制在一元操作符前后使用一致的空格
    "space-unary-ops": "warn",
    // 强制在 switch 的冒号左右有空格
    "switch-colon-spacing": "warn",
    // 强制箭头函数的箭头前后使用一致的空格
    "arrow-spacing": "warn",
    "no-var": "warn",
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly"
  }
}
