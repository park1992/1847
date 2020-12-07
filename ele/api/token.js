const jwt = require("jwt-simple");
// 生成token，第一个参数是要荷载的内容(playload)，第二个参数是key密钥
const KEY = "*&(*&*&90)";
const token = jwt.encode({
	adminName:"zhouwenli",   
	createTime:Date.now()- 11*60*1000   //生成时间
},KEY);
console.log(token);

// 解析token
const info = jwt.decode(token,KEY);
console.log(info);
// 设置10分钟过期
const nowTime = Date.now();
if(nowTime-info.createTime>10*60*1000){
	console.log("过期了");
}else{
	console.log("正常")
}

