import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import shop from './shop'
import goods from './goods'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {  // 存放项目的公共数据
		isLoading:false,
		pageIndex:1,
		pageSum:1
	},
	mutations:{
		// 当加载数据时commit('CAHNGE_IS_LOADING',true)
		// 加载完毕时commit('CAHNGE_IS_LOADING',false)
		// $store是vue实例下面的属性。组件当中。接收的参数名字state
		CHANGE_IS_LOADING(state,isLoading){
			state.isLoading = isLoading
		},
		CHANGE_PAGE_INFO(state,{pageIndex,pageSum}){
			 // console.log(pageSum);
			state.pageIndex = pageIndex;
			state.pageSum = pageSum;
		}
	},
	modules: {
		admin,
		shop,
		goods
	}
})
