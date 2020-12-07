module.exports={
	devServer:{
		open:true,   //自动打开浏览器
		host:"127.0.0.1",
		port:8082,
		// 服务代理
		proxy:{
			"/ele":{
				target:"http://127.0.0.1:8090",
				changeOrigin:true,
				pathRewrite:{
					"^/ele":""
				}
			}
		}
	}
}