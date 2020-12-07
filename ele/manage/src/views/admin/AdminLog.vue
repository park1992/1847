<template>
	<div>
		<!-- 插槽的测试
		<My>  
			<div slot="two" slot-scope="item">123{{item}}</div>
			<div>123</div>
			<div slot="one">456</div>
		</My> -->
					<!-- 绑定的是返回的数据      :border="true":border="true"，border加上纵向边框-->
		<el-table 
		:data="$store.state.admin.adminLog" 
		style="width: 100%" 
		:border="true"
		:v-loading="$store.state.isLoading">
			<el-table-column label="日志日期" width="200">
				<!-- 插槽 匿名，具名，插槽作用域-->
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.addTime | date}}</span>
				</template>
			</el-table-column>
			<el-table-column label="管理员名称" width="180">
				<template slot-scope="scope">
					{{scope.row.adminName}}
				</template>
			</el-table-column>
			<el-table-column label="日志说明">
				<template slot-scope="scope">
					{{scope.row.detail}}
				</template>
			</el-table-column>
			<el-table-column label="日志类别">
				<template slot-scope="scope">
					{{$store.state.admin.adminTypeEnum[scope.row.logType]}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button 
					size="mini"
					type="danger"
					@click = "$store.dispatch('deleteAdminLog',scope.row._id)"
					>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pageList actionName="getAdminLog"></pageList>
		<!-- <div class="toolbar">
			<el-pagination background layout="prev, pager, next" 
			:page-count="$store.state.pageSum" @current-change = "currentChange">
			</el-pagination>
		</div> -->
	</div>
</template>

<script>
	export default{
		name:"adminLog",
		// mounted() {
		// 	// 调用请求获得管理员日志的方法
		// 	this.$store.dispatch("getAdminLog")
		// },
		/* methods:{
			currentChange(pageIndex){
				// console.log(pageIndex)
				this.$store.dispatch("getAdminLog",pageIndex)
			}
		}, */
		components:{
			My:()=>import("@/components/My")
		}
	}
</script>

<style>
</style>
