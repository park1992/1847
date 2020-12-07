const express = require("express");
const bodyParser = require("body-Parser");
const db = require("./module/db2");
const tools = require("./module/tools");
const app = express();
const mongodb = require("mongodb");
const path = require("path");
app.use(bodyParser.json());
app.use(express.static(__dirname+"/upload"));
app.use(express.static(path.resolve(__dirname,"../site/dist")));
// 发送验证码
app.post('/sendCode',async (req,res)=>{
	/* 
		思路:
		1、接收数据（phoneCode)
		2、验证该手机号是否在指定的时间内发送过验证码
			1、发送过
				提示不要频繁发送，在xxx秒后再次发送
			2、未发送
				发送
	 */
	try{
		const phoneCode = req.body.phoneCode;  //手机号
		const codeInfo =await db.findOne("userCodeList",{  //数据库根据手机号查找
			phoneCode
		});
		// 判断是否有值
		if(codeInfo){
			// 判断验证码是否过期。time 当前时间减去发送时间
			const time = Date.now() - codeInfo.sendTime;
			if(time>20*1000){
				// 过期则重新发送
				const code = tools.getRandom(100000,999999);
				// 更新，发送验证码以及发送时间
				await db.updateOne("userCodeList",{phoneCode},{
					$set:{
						code,
						sendTime:Date.now()
					}
				});
				// await tools.sendCode(phoneCode,code);
				// tools.json(res,1,code,"发送验证码成功");
				res.json({
					ok:1,
					code,
					msg:"发送验证码成功"
				})
			}else{
				// 提示，发送不要太频繁
				tools.json(res,-1,"请不要发送太频繁。请在"+(30-Number.parseInt(time/1000))+"秒以后再次发送")
			}
		}else{
			// 数据库不存在手机号，发送验证码
			const code = tools.getRandom(100000,999999);
			await db.insertOne("userCodeList",{
				code,
				phoneCode,
				sendTime:Date.now()
			});
			// await tools.sendCode(phoneCode,code);
			// tools.json(res,code,1,"发送验证码成功");
			res.json({
				ok:1,
				code,
				msg:"发送验证码成功"
			})
		}
	}catch(msg){
		res.json({
			ok:-1,
			msg
		})
	}
})

// 对店铺列表进行分页
app.get("/shopList",async (req,res)=>{
	let pageIndex = req.query.pageIndex/1;
	const response = await db.page("shopList",{
		sort:{
			addTime:-1
		},
		pageIndex,
		limit:8
	})
	res.json(response);
})

// 登录
app.post("/login",async (req,res)=>{
	/* 
	   1、接收参数，手机号和验证码
	   2、去短信集合userCodeList中查找是否有匹配的
			1、有匹配
				1、验证验证码是否过期
					1、过期：提示验证码过期失败
					2、不过期
						1、用户集合中查找该用户是否登录过
							1、未登录过，增加一条用户信息
							2、登录过，更新一下用户信息
			2、无匹配，直接返回验证码错误				
	 */
	const {phoneCode,code} = req.body;
	const codeInfo = await db.findOne("userCodeList",{
		phoneCode,
		code:code/1
	})
	// 有匹配
	if(codeInfo){
		// 过期，提示验证码失败
		if((Date.now()-codeInfo.sendTime)>8*1000){
			tools.json(res,-1,"验证码过期失效了");
		}else{
			// 不过期
			const userInfo = await db.findOne("userList",{
				phoneCode
			});
			if(userInfo){
				// 如果用户存在，更新用户最后登陆时间
				await db.updateOne("userList",{
					phoneCode
				},{
					$set:{
						lastTime:Date.now()
					}
				})
			}else{
				await db.insertOne("userList",{
					phoneCode,
					regTime:Date.now(),
					lastTime:Date.now()
				})
			}
			res.json({
				ok:1,
				token:tools.encode({   //返回数据中心携带token
					phoneCode
				}),
				msg:"登录成功"
			})
		}
	}else{
		// 无匹配，直接返回验证码错误
		tools(res,-1,"验证码错误")
	}
})

// 根据店铺的关键字搜索相关店铺信息
app.get("/search",async(req,res)=>{
	const keyWord = req.query.keyWord;
	if(keyWord.length>0){   //有值
		const shopList = await db.find("shopList",{
			whereObj:{
				shopName:new RegExp(keyWord)
			}
		})
		res.json({
			ok:1,
			shopList
		})
	}else{
		res.json({
			ok:1,
			shopList:[]
		})
	}
})

// 根据店铺的Id获得店铺详情
app.get("/shopInfo/:shopId",async (req,res)=>{
	const shopId = req.params.shopId;
	const shopInfo = await db.findOneById("shopList",shopId);
	res.json({
		ok:1,
		shopInfo
	})
})

// 店铺类别列表,对应home页轮播图
app.get("/shopTypeList",async(req,res)=>{
	const shopTypeList = await db.find("shopTypeList",{
		sort:{
			addTime:-1
		},
		limit:30
	})
	res.json({
		ok:1,
		shopTypeList:tools.changeArr(shopTypeList,10)
	})
})

// 根据店铺类别ID获得店铺
app.get("/shopList/:shopTypeId",async (req,res)=>{
	const shopTypeId = req.params.shopTypeId;
	// console.log(shopTypeId)
	const shopList = await db.find("shopList",{
		whereObj:{
			shopTypeId:mongodb.ObjectId(shopTypeId)
		}
	});
	res.json({
		ok:1,
		shopList
	})
})

// 根据店铺Id获得商品类别
app.get("/goodsTypeList/:shopId",async(req,res)=>{
	const shopId = req.params.shopId;
	const goodsTypeList = await db.find("goodsTypeList",{
		whereObj:{
			shopId:mongodb.ObjectId(shopId)
		}
	})
	res.json({
		ok:1,
		goodsTypeList
	})
})

app.listen(8090,function(){
	console.log('success');
})