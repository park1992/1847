import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
		path:'/',
		name:'index',
		component:()=>import("@/views/Index"),
		children:[
			{
				path:'/',
				name:'home',
				component:()=>import("@/views/Home"),
			},
			{
				path:'/order',
				name:'order',
				component:()=>import("@/views/Order")
			},
			{
				path:'/my',
				name:'my',
				component:()=>import("@/views/My")
			}
		]
	},
	{
		path:'/login',
		name:'login',
		component:()=>import("@/views/Login"),
		meta:{
			isKeep:true
		}
	},
	{
		path:'/address',
		name:'address',
		component:()=>import("@/views/Address")
	},
	{
		path:'/study',
		name:'study',
		component:()=>import("@/views/Study")
	},
	{
		path:'/search',
		name:'search',
		component:()=>import("@/views/Search")
	},
	{
		path:'/shopDetail/:shopId.html',
		name:'shopDetail',
		component:()=>import("@/views/ShopDetail")	
	},
	{
		path:'/shopList/:shopTypeId.html',
		name:'shopList',
		component:()=>import("@/views/ShopList")	
	},
	{
		path:'/mySlot',
		name:'mySlot',
		component:()=>import("@/views/MySlot")	
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:"is-selected" //激活状态的链接（例如底部导航栏）添加一个类名is-selected，可以在对应页面设置样式
})

export default router
