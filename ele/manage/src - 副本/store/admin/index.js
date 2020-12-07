import axios from 'axios';

const state = {
		//设置默认值，防止刷新时重置到登录页面，state保存的值时暂时的 
		// sessionStorage不能跨页面
	  adminName:sessionStorage.adminName || null,
	  token:sessionStorage.token || null,
	  adminLog:[],
	  adminList:[],
	  // 枚举
	  adminTypeEnum:{
		  1:"管理员登录成功",
		  2:"管理员登陆失败"
	  }
  }
const mutations =  {
	  // 管理员信息更改
	  CHANGE_ADMIN_LIST(state,adminList){
		  state.adminList = adminList;
	  },
	  //把返回值赋值给 state中的 adminName
	  CHANGE_USER_NAME(state,{adminName,token}){
		  state.adminName = sessionStorage.adminName = adminName;
		  state.token = sessionStorage.token = token;
	  },
	  // 退出登录
	  OUT_LOGIN(state){
		  // 清除本地的值和sessionStorage中的值
		  sessionStorage.clear();
		  state.adminName = null;
	  },
	  //管理员日志
	   CHANGE_ADMIN_LOG(state,adminLog){
		   state.adminLog = adminLog;
	   }
  }
const actions = {
	// axios请求,传递两个参数，第二个是实例，不传实例的话改不了isLoading
	  async login({commit},vm){
												//第二个参数是对象，自定义的，里面有用户名adminName和密码passWord
		  const data = await axios.post("/login",vm.adminForm);
		  if(data.ok===1){
			  // 处理请求得到的返回值
			  commit("CHANGE_USER_NAME",{
				  adminName:vm.adminForm.adminName,
				  token:data.token
			  });
		  }else{
			  // 插件的报错提示
			  vm.$message.error(data.msg);
		  }
	  },
	  // 获取管理员列表
	  async getAdminList({commit},{pageIndex=1}={}){
		const {adminList} = await axios.get("/adminList",{
			params:{
				pageIndex
			}
		})
		// console.log(adminList);
		commit("CHANGE_ADMIN_LIST",adminList);
	  },
	  // 获取管理员日志
	  async getAdminLog({commit},{pageIndex=1}={}){
		  const {adminLog} = await axios.get("/adminLog",{
			  params:{
				  pageIndex
			  }		  	  
		  })
		  commit("CHANGE_ADMIN_LOG",adminLog);
		  // 第二个参数是一个对象,浪费了超过一个小时时间
		  // commit("CHANGE_PAGE_INFO",{pageIndex,pageSum})
	  },
	  // 删除管理员日志
	  async deleteAdminLog(context,id){
		  const data = await axios.delete("/adminLog/"+id);
		  // console.log(data);
		  if(data.ok===1){
			  // console.log(context);
			  context.dispatch('getAdminLog',context.rootState.pageIndex);
		  }else{
			  alert("删除失败")
		  }
	  }
  } 
export default({
  state,
  mutations,
  actions
})
