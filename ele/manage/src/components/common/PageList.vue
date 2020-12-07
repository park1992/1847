<template>
	<!--  -->
	<!-- <div class="toolbar">
		<el-pagination background layout="prev, pager, next" 
		:page-count="$store.state.pageSum" 
		@current-change="pageIndex=>$store.dispatch(actionName, {pageIndex,keyWord})">
		</el-pagination>
	</div> -->
	
	<!-- 以对象形式传递多个参数 -->
	<div class="toolbar">
		<el-pagination background layout="prev, pager, next" 
		:page-count="$store.state.pageSum" 
		@current-change="pageIndex=>$store.dispatch(actionName, {
			...query,            
			...{pageIndex}
		})">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: "PageList",
		/* methods: {
			currentChange(pageIndex) {
				// console.log(pageIndex)
				this.$store.dispatch("getAdminLog", pageIndex)
			}
		}, */
		props:{    //组件传值，父传子接收
			actionName:{
				type:String,   
				default:"getAdminList"
			},
			keyWord:{   //接收的值
				type:String,
				default:''
			},
			query:{     //接收的值,对象类型的
				type:Object,
				default(){
					return{					
					}
				}
			},
			obj:{   //对象传值，默认值函数形式
				type:Object,
				default(){
				    return {
				        d:100
				    }
				}
			}
		},
		mounted() {
			// 统一挂载在此处，每个页面都可以用
			this.$store.dispatch(this.actionName);
			// console.log(4444,this.obj);
		}
	}
</script>

<style>
</style>
