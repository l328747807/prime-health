import Vue from 'vue'
//注册element-ui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

//注册myPlugin插件
import myPlugin from './myPlugin'
Vue.use(myPlugin)