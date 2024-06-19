import App from './App'
// 1. 全局引入你需要的组件
import Vant from 'vant';
// 2. 全局引入组件样式
import 'vant/lib/index.css';

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp () {
  const app = createSSRApp(App)
  // 3.使用组件
  app.use(Vant)
  return {
    app
  }
}
// #endif