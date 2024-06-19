import axios from 'axios'
import { isEmpty, transformParams } from '@/utils'
import { getToken } from '@/utils/auth'
import cache from '@/utils/cache'
import { pickBy } from 'lodash';
import BASE_URL  from '@/config'
import errorCode from '@/utils/errorCode'

// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: BASE_URL,
  // 超时
  timeout: 20000
})

// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
  const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + transformParams(config.params);
    // 去除结尾的&
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  if (!isRepeatSubmit && ['post', 'put', 'get'].includes(config.method)) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const sessionObj = cache.session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url;                // 请求地址
      const s_data = sessionObj.data;              // 请求数据
      const s_time = sessionObj.time;              // 请求时间
      const interval = 1000;                       // 间隔时间(ms)，小于此时间视为重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交';
        console.warn(`[${s_url}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
  }

  // 传参时如果为空或null，不传该字段
  if (!config.noEmptyCheck) {
    if (config.params) {
      config.params = pickBy(config.params, parameter => !isEmpty(parameter));
    }
    if (config.data) {
      config.data = pickBy(config.data, parameter => !isEmpty(parameter));
    }
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200;
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode['default']
  // 二进制数据则直接返回
  if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    return res.data
  }
  if (code === 401) {
    if (!isRelogin.show) {
      isRelogin.show = true;
      return Promise.then((reslove, reject) => {
        uni.showToast({
          title: '登录状态已过期!需要重新登录',
          icon: 'none',
        });
        //当前token应该无效了，需要重新登录
        uni.redirectTo({
          url: `/pages/login`
        });
      }).finally(() => {
        isRelogin.show = false;
      });
    }
    return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
  } else if (code === 500) {
    uni.showToast({
      title: msg,
      icon: "fail"
    })
    return Promise.reject(new Error(msg))
  } else if (code === 601) {
    uni.showToast({
      title: msg,
      icon: "error"
    })
    return Promise.reject(new Error(msg))
  } else if (code !== 200 && code !== '200') {
    uni.showToast({
      title: msg,
      icon: "none"
    })
    return Promise.reject('error')
  } else {
    return Promise.resolve(res.data)
  }
},
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    uni.showToast({
      title: message,
      icon: "error",
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)


export default service