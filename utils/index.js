/**
 * 判断某个值是否是空字符串、空对象、空数组、null、undefined、NaN中的一个,不包含数字0
 * @param {*} val
 */
export function isEmpty (val) {
  let flag = false;
  const type = Object.prototype.toString.call(val);

  switch (type) {
    // 空字符串
    case '[object String]':
      if (val.trim() === '') {
        flag = true;
      }
      break;
    // null
    case '[object Null]':
      flag = true;
      break;
    // undefined
    case '[object Undefined]':
      flag = true;
      break;
    // NaN
    case '[object Number]':
      if (isNaN(val)) {
        flag = true;
      }
      break;
    // 空数组
    case '[object Array]':
      if (val.length === 0) {
        flag = true;
      }
      break;
    // 空对象
    case '[object Object]':
      if (Object.keys(val).length === 0) {
        flag = true;
      }
      break;
  }

  return flag;
}

/**  
 * 将一个对象参数转换为一个URL编码的查询字符串。  
 *  
 * @param {Object} params - 要转换的对象参数。  
 * @returns {string} - 转换后的URL编码查询字符串。  
 */
export function transformParams (params) {
  let result = []; // 初始化一个数组来存储每个键值对的字符串表示  
  // 遍历params对象的每个属性  
  for (const propName of Object.keys(params)) {
    const value = params[propName]; // 获取当前属性的值  

    // 检查值是否为非空、非null和非undefined  
    if (value !== null && value !== "" && typeof value !== "undefined") {
      // 如果属性值是一个对象  
      if (typeof value === 'object') {
        // 遍历嵌套对象的每个属性  
        for (const key of Object.keys(value)) {
          // 检查嵌套对象的属性值是否为非空、非null和非undefined  
          if (value[key] !== null && value[key] !== "" && typeof value[key] !== 'undefined') {
            // 构建嵌套属性的字符串表示，例如 'propName[key]'  
            const paramsStr = propName + '[' + key + ']';
            // 将构建好的字符串添加到结果数组中  
            result.push(encodeURIComponent(paramsStr) + '=' + encodeURIComponent(value[key]));
          }
        }
        // 如果属性值不是对象  
      } else {
        // 构建当前属性的字符串表示，并添加到结果数组中  
        result.push(encodeURIComponent(propName) + '=' + encodeURIComponent(value));
      }
    }
  }
  // 使用 '&' 连接数组中的每个字符串，并返回最终的查询字符串  
  return result.join('&');
}