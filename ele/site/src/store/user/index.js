import axios from "axios";
export default{
  state: {
	  token:localStorage.token || null,
	  phoneCode:localStorage.phoneCode || null
  },
  mutations: {
	CHANGE_TOKEN(state,{token,phoneCode}){
		state.token=localStorage.token = token;
		state.phoneCode = localStorage.phoneCode = phoneCode;
	} 
  },
  actions: {
	  // 传递vm实例
	async login({commit},vm) {
		// console.log(vm.phoneCode);
		if (vm.code.length < 1) {
			vm.code_invalid = true
		} else {
			vm.code_invalid = false
			const {data} = await axios.post("/ele/login",{
				phoneCode:vm.phoneCode,
				code:vm.code
			});
			// console.log(data);
			if(data.ok===1){
				// 此处phoneCode不是从数据库返回的，是一开始写入的值
				commit("CHANGE_TOKEN",{token:data.token,phoneCode:vm.phoneCode})
				// console.log(data.phoneCode)
				vm.$router.push("/my");
			}else{
				alert(data.msg);
			}
			
		}
	} 
  },
}
