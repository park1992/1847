export default[
	{
		path:'/shopTypeList',
		name:"shopTypeList",
		component:()=>import("@/views/shop/ShopTypeList.vue")
	},
	{
		path:'/shopList',
		name:'shopList',
		component:()=>import("@/views/shop/ShopList.vue")
	}
]