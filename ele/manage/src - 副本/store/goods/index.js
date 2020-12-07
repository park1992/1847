import axios from 'axios';
export default{
	state:{
		goodsTypeList:[]
	},
	mutations:{
		CHANGE_GOODS_TYPE_LIST(state,goodsTypeList){
			state.goodsTypeList = goodsTypeList;
		}
	},
	actions:{
		async getGoodsTypeList({commit},{pageIndex=1}={}){
			const {goodsTypeList} = await axios.get("/goodsTypeList",{
				params:{
					pageIndex
				}
			})
			commit("CHANGE_GOODS_TYPE_LIST",goodsTypeList);
		}
	}
}