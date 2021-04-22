//导入方法
import {get,post} from '../util/request'
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
          }
      })
    }
  }