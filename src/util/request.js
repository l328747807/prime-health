//-------------------------------封装请求相关方法---------------------------------
//导入NProgress加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//导入axios
import axios from 'axios'

let instance = axios.create({
    // 设置接口地址根路径
    baseURL: 'https://some-domain.com/api/',
    // 设置超时时间
    timeout: 30000,
    headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    NProgress.start()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    NProgress.done()
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    NProgress.done()
    return response;
  }, function (error) {
    // 对响应错误做点什么
    NProgress.done()
    return Promise.reject(error);
  });
//封装get请求
let get = async function(url ,params){
    let {data} =await instance.get(url, { params });
    return data
}

//封装post请求
let post = async function(url ,params){
    let {data} =await instance.post(url, params);
    return data
}

//导出方法
export {
    get,
    post,
}