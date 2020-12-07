const jwt = require("jwt-simple");
// 生成token，第一个参数是要荷载的内容(playload)，第二个参数是key密钥
const KEY = "*&(*&*&90)";
const fs = require("fs");
const path = require("path");
const request = require("request");
const querystring = require("querystring");  //聚合数据引入时所需
module.exports = {
	getRandom(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	},
	changeArr(arr,len=10){
		const arr2=[];
		for(let i=0;i<arr.length;i+=len){
			arr2.push(arr.slice(i,i+len));
		}
		return arr2
	},
	sendCode(mobile,code){
		const queryData = querystring.stringify({
			mobile,  // 接受短信的用户手机号码
			"tpl_id": "164473",  // 您申请的短信模板ID，根据实际情况修改
			"tpl_value": "#code#="+code,  // 您设置的模板变量，根据实际情况修改
			"key": "b354521c02f2048",  // 应用APPKEY(应用详细页查询)
		});
		var queryUrl = 'http://v.juhe.cn/sms/send?'+queryData;
		
		return new Promise((resolve,reject)=>{
			request(queryUrl,function(error,response,body){
				if(error && response.statusCode==200){
					const res = JSON.parse(body);
					if(res.error_code===0)
						resolve(res);
					else
						reject(res);
				}else{
					reject(JSON.parse(body));
				}
			})
		})
	},
    getNowTime(){
        var date = new Date();
        return date.getFullYear() + "-" +
            ((date.getMonth() + 1)).toString().padStart(2, 0) + "-" +
            (date.getDate()).toString().padStart(2, 0) + " " +
            (date.getHours()).toString().padStart(2, 0) + ":" +
            (date.getMinutes()).toString().padStart(2, 0) + ":" +
            (date.getSeconds()).toString().padStart(2, 0);
    },
	// 封装删除图片的方法
	async deletePic(picName){
	    return new Promise((resolve,reject)=>{
	        fs.unlink(path.resolve(__dirname,"../upload/"+picName),function (err) {
	            if(err){
	                reject(1);// 1失败
	            }else{
	                resolve(0);// 成功
	            }
	        })
	    })
	},
    json(res,ok=-1,msg="网络连接错误"){
        res.json({
            ok,
            msg
        })
    },
	// 生成token
	encode(payload){
		return jwt.encode({
			...payload,
			...{
				createTime:Date.now()
			}
		},KEY) 
	},
	// 解析token
	// 切记，比较时不要使用中文比较
	decode(token){
		try{
			const info = jwt.decode(token,KEY);
			// 10分钟过期
			const times =10000*60*1000;
			if((Date.now()-info.createTime)>times){
				return {
				    ok:2,
				    msg:"token过期啦"
				}
			}else{
				return {
					ok:3,
					msg:"token正常",
					info   //没写，耽误了半个小时
				}
			}
		}catch(e){
			return {
				ok:1,
				msg:"token解析失败"
			}
		}
	}
}