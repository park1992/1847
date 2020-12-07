const db = require("./db2");
module.exports = {
	// 商品类别添加
	async addGoodsTypeList(req,res){
		// 根据店铺的Id获得店铺的信息
		const shopInfo = await db.findOneById("shopList",req.body.shopId);
		await db.insertOne("goodsTypeList",{
			goodsTypeName:req.body.goodsTypeName,
			shopId:shopInfo._id,
			shopName:shopInfo.shopName,
			shopTypeId:shopInfo.shopTypeId,
			shopTypeName:shopInfo.shopTypeName,
			addTime:Date.now()
		})
		res.json({
			ok:1,
			msg:"插入成功"
		})
	},
	
	async getGoodsTypeList(req,res){
		const pageIndex = req.query.pageIndex;
		const response = await db.page("goodsTypeList",{
			pageIndex,
			sort:{
				addTime:-1
			},
			limit:2
		})
		res.json(response);
	}
}