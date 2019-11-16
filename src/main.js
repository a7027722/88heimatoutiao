import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
import axios from 'axios'
import JSONbig from 'json-bigint'
//  引入JSONbig 解决参数id值在转化JSON格式传输时 axios请求自动把字符串转为js对象
// js对id值长度限制导致失去精确度 id值超过了js安全证书范围无法精确表示
// 进入该方法对data进行 JSONbig运算 用时将 数据.toString() 来获取id精确值
axios.defaults.transformResponse = [function (data) {
  // 当传的参数报错时 执行catch内的内容 不报错就执行try里的内容  try{}catch(){} 是js方法
  try {
    return JSONbig.parse(data)
  } catch (err) {
    return {}
  }
}]
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios 里有请求拦截器 后端实际接收到的是函数内config对象 把token 加在这里 全局使用
axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('user-token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
