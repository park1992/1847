const upPic = require("./upPic");
const tools = require("./tools");
const db = require("./db2");
const mongodb = require("mongodb");
module.exports = {
	//添加店铺
	postShopList(req,res){
 	upPic(req,"shopPic",async function({ok,msg,params}){
 		if(ok===1){
			// 根据店铺类别ID获得店铺类别信息
			const shopTypeInfo = await db.findOneById("shopTypeList",params.shopTypeId);
 			await db.insertOne("shopList",{
				shopTypeId:shopTypeInfo._id,   //店铺类别集合中的_id
 				shopName:params.shopName,
				shopTypeName:shopTypeInfo.shopTypeName,
 				shopPic:params.newPicName,
 				addTime:Date.now()
 			})
 			tools.json(res,1,"上传成功");
 		}else{
 			tools.json(res,-1,msg);
 		}
 	})
 },

 // 获取店铺	
	async getShopList (req,res){
	 let pageIndex = req.query.pageIndex/1;
	 const response = await db.page("shopList",{
		sort:{
			addTime:-1
		},
		limit:1,
		pageIndex
	})
	res.json(response);
},

	// 店铺管理中，根据Id获取店铺信息，渲染弹出层
	async getShopListByShopId (req,res){
	const shopInfo = await db.findOneById("shopList",req.params.id);
	res.json({
		ok:1,
		shopInfo
	})
},
	async getShopListByShopTypeId (req,res){
		 const shopList = await db.find("shopList",{
			 whereObj:{
				 shopTypeId:mongodb.ObjectId(req.params.shopTypeId)
			 }
		 })
		 res.json({
			 ok:1,
			 shopList
		 })
	}
}