import axios from 'axios';
import { Toast } from 'mint-ui';   //引入mint组件
const state = {
	searchShopList:''
}
const mutations ={
	CHANGE_SEARCH_SHOP_LIST(state,shopList){
		state.searchShopList = shopList;
	}
}
const actions ={
	async search({commit},keyWord){
		if(keyWord.length>0){
			const {data} = await axios.get("/ele/search",{
				params:{
					keyWord
				}
			})
			commit("CHANGE_SEARCH_SHOP_LIST",data.shopList);
			// console.log(data.shopList)
		}else{
			Toast({                            //mint组件
			  message: '请输入店铺',             //文字提示
			  iconClass: 'iconfont iconicon-test'   //icon图标
			});
		}
	}
}


export default{
	state,
	mutations,
	actions
}