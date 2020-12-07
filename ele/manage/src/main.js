import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Login from './Login'
import ElementUI from 'element-ui'; //引入组件库
import 'element-ui/lib/theme-chalk/index.css'; //引入组件需要的css
import axios from 'axios'
import filters from './filters/index.js'
import components  from './components/index.js'
Vue.prototype.$axios = axios   //把axios挂载到Vue原型上，别的地方可以直接用
Vue.config.productionTip = false
Vue.use(ElementUI) //安装elementui插件
// let token = window.sessionStorage.getItem("token")
// console.log(token);

for(let key in components){  //引入组件，全部变为全局组件
    Vue.component(key,components[key])
}
for(let key in filters){   //过滤器
	Vue.filter(key,filters[key])
}
// axios拦截
// 请求拦截，将所有通过axios发送的请求拦截下来，后，在此处统一对配置进行管理
axios.interceptors.request.use(config=>{
	store.commit("CHANGE_IS_LOADING",true)
	// console.log(config)
	// 防止缓存，在尾部加上？z=时间戳
	config.url = "/ele"+config.url+"?z="+Date.now();
	// 请求头部信息,携带token发起请求
	config.headers = {
		authorization:store.state.admin.token
	}
	return config;
})
// 响应拦截
axios.interceptors.response.use(({data})=>{
	// console.log(data);
	if(data.ok===2){   //token异常
		store.commit("OUT_LOGIN");
	}
	
	store.commit("CHANGE_IS_LOADING",false);
	// 判断是否有返回值pageIndex
	if(data.pageIndex)
	// 有的话，调用赋值给全局的state
		store.commit("CHANGE_PAGE_INFO",{pageIndex:data.pageIndex,pageSum:data.pageSum});
	return data;
}) 
new Vue({
	router,
	store,
	render: function(h) {
		return h(this.$store.state.admin.adminName ? App : Login)
	}
}).$mount('#app')
