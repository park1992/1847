import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/style/reset.css"    //引入公共样式
import components from './components'
import axios from 'axios'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(MintUI)
for(let key in components){
	Vue.component(key,components[key])
}
new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
