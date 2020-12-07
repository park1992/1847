export default[
	{
		path:'/',
		name:'adminLog',
		component:()=>import("@/views/admin/AdminLog.vue")
	},
	{
		path:'/adminList',
		name:'adminList',
		component:()=>import("@/views/admin/AdminList.vue")
	}
]
