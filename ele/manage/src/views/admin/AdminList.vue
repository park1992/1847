<template>
	<div>
		<el-table :data="$store.state.admin.adminList" style="width: 100%" :border="true" :v-loading="$store.state.isLoading">
			<el-table-column label="id" width="230">
				<!--                插槽    -->
				<template slot-scope="scope">
					{{scope.row._id}}
				</template>
			</el-table-column>
			
			<el-table-column label="最后登录日期" width="200">
				<!-- 插槽 匿名，具名，插槽作用域-->
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.loginTime | date}}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="管理员名称" width="180">
				<template slot-scope="scope">
					{{scope.row.adminName}}
				</template>
			</el-table-column>

			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<pageList actionName="getAdminList"></pageList>
	</div>

</template>

<script>
	export default {
		name: "adminList",
		/* mounted() {
			// 挂载浪费了半个小时
			this.$store.dispatch("getAdminList")
		} */
	}
</script>

<style>
</style>
