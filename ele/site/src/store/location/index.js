const state = {
	formattedAddress: localStorage.formattedAddress || "",
	tips:[]   //查找出来的结果
}
const mutations = {
	CHANGE_ADDRESS(state, address) {
		state.formattedAddress = localStorage.formattedAddress = address;
	},
	CHANGE_TIPS(state,tips){
		state.tips = tips;
	}
}
const actions = {
	// 获得定位
	getFormattedAddress({commit}) {
		if (!localStorage.formattedAddress) {
			commit("CHANGE_ADDRESS", "定位中……");
			AMap.plugin('AMap.Geolocation', function() {
				var geolocation = new AMap.Geolocation({
					// 是否使用高精度定位，默认：true
					enableHighAccuracy: true,
					// 设置定位超时时间，默认：无穷大
					timeout: 10000,
				})
				geolocation.getCurrentPosition()
				AMap.event.addListener(geolocation, 'complete', onComplete)
				AMap.event.addListener(geolocation, 'error', onError)

				function onComplete(data) {
					// data是具体的定位信息
					console.log(data);
					commit("CHANGE_ADDRESS", data.formattedAddress)
					// _this.formattedAddress = data.formattedAddress
				}

				function onError(data) {
					// 定位出错
				}
			})
		}
	},
	autoComplete({commit},keyword){
		AMap.plugin('AMap.Autocomplete', function(){
	  // 实例化Autocomplete
	  var autoOptions = {
		//city 限定城市，默认全国
		city: '全国'
	  }
	  var autoComplete= new AMap.Autocomplete(autoOptions);
	  autoComplete.search(keyword, function(status, result) {
		// 搜索成功时，result即是对应的匹配数据
		// console.log(status,result);
		commit("CHANGE_TIPS",result.tips)
	  })
	})
	}
}
export default {
	state,
	mutations,
	actions
}
