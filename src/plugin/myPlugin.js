//导入方法
import {get,post,setToken} from '../util/request'
//定义一个插件
export default {
    //使用install向 Vue 添加全局级功能
    install: (Vue, options) => {
      // Plugin code goes here
      Vue.mixin({
          methods:{
              $get(url,params){
                  return get(url,params)
              },
              $post(url,params){
                return post(url,params)
              },
              $setToken(){
                //执行该方法，将浏览器缓存里面的token信息保持到axios请求头中
                return setToken()
              }
          }
      })
    }
  }