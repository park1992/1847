const express = require("express");
const bodyParser = require("body-parser"); // 接收body传值时引入
const md5 = require("md5"); //引入md5加密
const db = require("./module/db2"); //数据库
const tools = require("./module/tools");
const upPic = require("./module/upPic");
const app = express();
const mongodb = require("mongodb");
const shopList = require("./module/shopList");
const goodsTypeList = require("./module/goodsTypeList");
app.use(bodyParser.json());
app.use(express.static(__dirname+"/upload"));
/***************************admin*******************************/
// 登录接口
app.post("/login",async (req,res)=>{
	try{
		// 接收账号和密码
		const {adminName,passWord} = req.body;
		// 根据账号和密码查找管理员
		const info = await db.findOne("adminList",{
			adminName,
			passWord: md5(passWord + "?1992?")
		})
		// 插入数据
		await db.insertOne("adminLog",{
			adminName,
			logType:(info?1:2),
			detail:"登录信息:"+(info?"成功":"失败"),
			addTime:Date.now()
		})
		// 返回结果
		if(info){
			// 更新管理员最后登录时间
			await db.updateOne("adminList",{_id:info._id},{$set:{loginTime:Date.now()}})
			res.json({
				ok:1,
				msg:"登录成功",
				token:tools.encode({adminName})
			})
		}else{
			tools.json(res,-1,"账号或密码错误")
		}
	}
	catch(err){
		tools.json(res,-1,err)
	}
})
// 除了登录意外，其它接口都走该路由，验证token
app.all("*",(req,res,next)=>{
	// 接收请求的token，解密，根据返回判断
	const token = req.headers.authorization;
	const {ok,msg,info} = tools.decode(token);
	// console.log(ok,msg,info)
	if(ok===3) next()
	else tools.json(res,2,msg);
})
//获得管理员日志 //用封装page的方法
 app.get("/adminLog" ,async(req,res)=>{
	 let pageIndex = req.query.pageIndex/1;
	 const response = await db.page("adminLog",{
		 sort:{
			 addTime:-1
		 },
		 pageIndex
	 })
	 res.json(response)
	 /*获得指定页数的信息*/
	/* let pageIndex = req.query.pageIndex/1;  //未封装的方法
	 const limit = 10; //每页显示的数量
	 let pageSum = 1;
	 // 获得集合的总条数
	 const count = await db.count("adminLog");
	 // 确定总页数，及当前页数
	 pageSum = Math.ceil(count/limit);
	 if(pageSum<1) pageSum=1;
	 if(pageIndex<1) pageIndex=1;
	 if(pageIndex>pageSum) pageIndex = pageSum;
	 
	 const adminLog = await db.find("adminLog",{
		 limit,
		 skip:(pageIndex-1)*limit,
		 sort:{
			 addTime:-1
		 }
	 })
	 // console.log(pageIndex);
	 res.json({
		 ok:1,
		 adminLog,
		 pageIndex,
		 pageSum
	 }) */
 })

//获得管理员列表
 app.get("/adminList",async(req,res)=>{
	 let pageIndex = req.query.pageIndex/1;
	 const response = await db.page("adminList",{
		 sotr:{
			 addTime:-1,
		 },
		 limit:1,
		 pageIndex
	 })
	 res.json(response);
 })

// 根据ID删除管理员日志
app.delete("/adminLog/:id",async (req,res)=>{
	try{
		const id = req.params.id;
		// console.log(id);
		await db.deleteOneById("adminLog",id);
		tools.json(res,1,"删除成功")
	}catch(e){
		tools.json(res,-1,"删除失败")
	}
})
/****************************shopType*******************************************/
// 提交添加店铺类别信息
app.post("/shopTypeList",(req,res)=>{
	upPic(req,"shopTypePic",async function({ok,msg,params}){
		if(ok===1){
			await db.insertOne("shopTypeList",{
				shopTypeName:params.shopTypeName,
				shopTypePic:params.newPicName,
				addTime:Date.now()
			})
			tools.json(res,1,"上传成功");
		}else{
			tools.json(res,-1,msg);
		}
	})
})

// 修改店铺类别
app.put("/shopTypeList",(req,res)=>{
	// 封装的upPic
	upPic(req,"shopTypePic",async function({ok,msg,params}){
		if(ok===3){
			tools.json(res,-1,msg);
		}else{
			const upObj = {
				$set:{
					shopTypeName:params.shopTypeName
				}
			}
			// 如果成功上传了图片
			if(ok===1){
				const shopTypeInfo = await db.findOneById("shopTypeList",params.shopTypeId);
				// console.log(11111111,shopTypeInfo.shopTypePic);
				const result = await tools.deletePic(shopTypeInfo.shopTypePic);  //删除
				upObj.$set.shopTypePic = params.newPicName;
			}
			// 直接修改
			await db.updateOneById("shopTypeList",params.shopTypeId,upObj);
			tools.json(res,1,"修改成功")
		}
	})
})

// 店铺类别列表渲染
app.get("/shopTypeList",async (req,res)=>{
	const pageIndex = req.query.pageIndex;
	const keyWord = req.query.keyWord ||"";   //关键字查询
	let whereObj = {}; 
	if(keyWord){  
		whereObj={
			shopTypeName:new RegExp(keyWord) //模糊匹配查找
		}
	}
	const response = await db.page("shopTypeList",{
		pageIndex,
		whereObj,  
		sort:{
			addTime:-1
		},
		limit:2   
	})
	res.json(response);
})

// 获取店铺类别
app.get("/allShopTypeList",async (req,res)=>{
	const shopTypeList = await db.find("shopTypeList",{
		sort:{
			addTime:-1
		}
	});
	res.json({
		ok:1,
		shopTypeList
	})
})

/*****************************shopList****************************************/
//添加店铺
 app.post("/shopList",shopList.postShopList);
// 获取店铺
app.get("/shopList",shopList.getShopList);

// 店铺管理中，根据Id获取店铺信息，渲染弹出层
app.get("/shopInfo/:id",shopList.getShopListByShopId);

// 删除店铺
app.delete("/shopList/:id",async (req,res)=>{
	try{
		const id = req.params.id;
		await db.deleteOneById("shopList",id);
		tools.json(res,1,"删除成功")
	}catch(e){
		tools.json(res,-1,"删除失败")
	}
})

//根据店铺类别Id，获得店铺信息
app.get("/shopList/:shopTypeId",shopList.getShopListByShopTypeId);

/*****************************goodsTypeList************************************/
// 商品类别添加
app.post("/goodsTypeList",goodsTypeList.addGoodsTypeList);

// 获取商品类别，渲染到页面
app.get("/goodsTypeList",goodsTypeList.getGoodsTypeList);

// app.post("/login", (req, res) => {
// 	/* 
// 	1、接收参数，adminName和passWord
// 	2、去数据库中搜索
// 		1、查到，登录成功
// 			1、增加登录日志
// 				返回内容：{}
// 		2、未找到，登录失败
// 	 */
// 	const {
// 		adminName,
// 		passWord
// 	} = req.body;
// 	// console.log(adminName,passWord);
// 	// 调用db中的查找方法
// 	db.findOne("adminList", {
// 		adminName,
// 		// passWord
// 		// 加密密码，数据库名字没改成ele，浪费了大量的时间
// 		passWord: md5(passWord + "?1992?")
// 	}, function(err, info) {
// 		if (err) tools.json(res);
// 		else {
// 			// 插入管理员登录日志
// 			db.insertOne("adminLog", {
// 				adminName,
// 				logType: (info ? 1 : 2),
// 				detail: "登录信息:" + (info ? "成功" : "失败"),
// 				addTime: Date.now()
// 			}, function(err, results) {
// 				if (info) {
// 					res.json({
// 						ok:1,
// 						msg:"登录成功",
// 						token:tools.encode({adminName})
// 					})
					
// 				} else {
// 					tools.json(res, -1, "账号或密码错误");
// 				}
// 			})

// 			/* setTimeout(()=>{
// 				if(info){
// 			    tools.json(res,1,"登陆成功");
// 			}else{
// 			    tools.json(res,-1,"账号或密码错误");
// 			}
// 			},1000) */
// 		}
// 	})

// })


// 监听端口
app.listen(80, function() {
	console.log("success")
})
