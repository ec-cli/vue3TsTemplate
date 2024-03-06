/*
 * @Description: file content
 * @Author: rk
 * @Date: 2022-12-02 17:23:07
 */

// 将全局 css 变量导入 js 中使用
export const getCssVariableValue = (cssVariableName: string) => {
    let cssVariableValue = ""
    try {
        // 没有拿到值时，会返回空
        cssVariableValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariableName)
    } catch(err) {
        console.error(err)
    }
    return cssVariableValue
}

/**
 * 生成当前时间（年月日时分秒）
 * @param {*} timeStamp
 * @param {*} type 1=>生成年月,2=>年月日,3=>年月日时分秒
 * @returns 
 */
export const timeFormate = (timeStamp:any, type:number) => {
    let now = new Date(timeStamp);
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let date = (now.getDate()).toString().padStart(2, "0");
    let hh = (now.getHours()).toString().padStart(2, "0");
    let mm = (now.getMinutes()).toString().padStart(2, "0");
    let ss = (now.getSeconds()).toString().padStart(2, "0");
    if (type == 1) {
      return `${year}-${month}`;
    } else if (type == 2) {
      return `${year}-${month}-${date}`;
    } else {
      return `${year}-${month}-${date} ${hh}:${mm}:${ss}`;
    }
}

/**
 * 将url中的参数转为对象，如www.baidu.com?a=1&b=2 转为{a:1,b:2}
 * @param {*} url 
 * @returns 
 */
export const paramsFormate = (url:string) => {
    url = url ? url.split("?")[1] : "";
    let _url = url || window.location.search.replace("?", "");
    if (_url) {
      return Object.fromEntries(new URLSearchParams(_url));
    }
}
/**
 *  深拷贝
 */
export function deepCopy<T>(obj: any): T {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (typeof obj[attr] === "object") {
			newObj[attr] = deepCopy(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
}
/** 生成16位随机字符串*/
export const createNonceStr = () => {
    let chars = [
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    ];
    let nums = "";
    for (let i = 0; i < 16; i++) {
      //这里是几位就要在这里不改变
      let id = parseInt(Math.random() * 61 + "");
      nums += chars[id];
    }
    return nums;
}

/**
 *  匹配字典的方法
 *  @param index必传 索引值
 *  @param dictionary必传 字典数据
 */
export const dictionaryMatch = (index:string, dictionary:[]) => {
    let label = "";
    let value = "";
    dictionary.forEach((item:any) => {
      // ?? 如果左侧是null或者undefined才会取右边的值，如果是0，则取值为0
      value = item.value ?? item.id ?? item.type;
      if (value == index) {
        label = item.label || item.name;
      }
    });
    return label;
}