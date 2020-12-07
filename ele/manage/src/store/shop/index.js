import axios from "axios";
export default{
	state:{
		shopTypeList:[],
		allShopTypeList:[],
		shopList:[],
		shopListByTypeId:[]    //根据店铺类别id，获取的店铺列表
	},
	mutations:{
		CHANGE_SHOP_LIST_TYPEID(state,shopList){
			state.shopListByTypeId = shopList;
		},
		
		CHANGE_SHOP_LIST(state,shopList){
			// console.log(111111,shopList);
			state.shopList = shopList;
		},
		CHANGE_SHOPTYPE_LIST(state,shopTypeList){
			state.shopTypeList = shopTypeList;
		},
		CHANGE_ALL_SHOPTYPE_LIST(state,shopTypeList){
			// console.log(111111111,shopTypeList);
			state.allShopTypeList = shopTypeList;
		}
	},
	actions:{
		async getShopListByShopTypeId({commit},shopTypeId){
			const {shopList} = await axios.get("/shopList/"+shopTypeId);
			commit("CHANGE_SHOP_LIST_TYPEID",shopList);
		},
		
		// ShopList中调用
		async getShopList({commit},{pageIndex=1}={}){  
			const data = await axios.get("/shopList",{
				params:{
					pageIndex
				}
			})
			commit("CHANGE_SHOP_LIST",data.shopList)
		},
		// 删除店铺
		async deleteShopList(context,id){
			const data = await axios.delete("/shopList/"+id);
			// console.log(data);
			if(data.ok===1){
				context.dispatch('getShopList',context.rootState.pageIndex);
			}else{
				alert("删除失败");
			}
		},
		// ShopTypeList中调用
		async getShopTypeList({commit},{pageIndex=1,keyWord,_id}={}){
			const data = await axios.get("/shopTypeList",{
				params:{
					pageIndex,
					keyWord,
					_id
				}
			})
			commit("CHANGE_SHOPTYPE_LIST",data.shopTypeList)
		},
		//ShopDialog中调用
		async getAllShopTypeList({commit}){   
			const data = await axios.get("/allShopTypeList");
			commit("CHANGE_ALL_SHOPTYPE_LIST",data.shopTypeList);
		}
		
	}
}