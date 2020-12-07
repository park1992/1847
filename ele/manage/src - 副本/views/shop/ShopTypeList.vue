<template>
	<div>
		<div class="toolbar">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input placeholder="请输入搜索的关键字" v-model="shopTypeName"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="$store.dispatch('getShopTypeList',{keyWord:shopTypeName})">查询</el-button>
				</el-form-item>

				<el-form-item>
					<el-button type="success" @click="shopTypeVisible=true;info={}">增加店铺类别</el-button>
				</el-form-item>
			</el-form>
		</div>

		<el-table 
				:data="$store.state.shop.shopTypeList" 
				style="width: 100%"
				:border="true" 
				:v-loading="$store.state.isLoading"
				>
			<el-table-column label="id" width="230">
				<!--                插槽    -->
				<template slot-scope="scope">
					{{scope.row._id}}
				</template>
			</el-table-column>
			
			<el-table-column label="创建日期" width="200">
				<!-- 插槽 匿名，具名，插槽作用域-->
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.addTime | date}}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="店铺类别的名字" width="180">
				<template slot-scope="scope">
					{{scope.row.shopTypeName}}
				</template>
			</el-table-column>
		
			<el-table-column label="店铺类别的图片" width="180">
				<template slot-scope="scope">
					<img height="100px" :src="'/ele/'+scope.row.shopTypePic" alt=""/>
				</template>
			</el-table-column>
			
			<el-table-column label="操作">
				<template slot-scope="scope">
					<!-- 重新获取，以防别人改动，页面没更新 -->
					<el-button size="mini" type="primary" @click="shopTypeVisible=true;info=scope.row" >修改</el-button>
					<el-button size="mini" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		
		<!-- <PageList actionName="getShopTypeList" :keyWord="shopTypeName"></PageList> -->
													<!-- 传递的是对象 -->
		<PageList actionName="getShopTypeList" :query="{keyWord:shopTypeName,_id:1}"></PageList>
		
		<shop-type-dialog v-if="shopTypeVisible" :info=info :shopTypeVisible.sync="shopTypeVisible"></shop-type-dialog>
		<!-- <shop-type-dialog :shopTypeVisible="shopTypeVisible" @update:shopTypeVisible="bol=>shopTypeVisible=bol"></shop-type-dialog> -->
		
	</div>
</template>

<script>
	// 已经引入到全局，此处可以不写
	import ShopTypeDialog from "../../components/shop/ShopTypeDialog";
	export default {
		name: "shopTypeList",
		components:{
			ShopTypeDialog
		},
		data() {
			return {
				// 双向绑定查询框
				shopTypeName:'',
				shopTypeVisible:false,
				info:{}
			}
		}
		
	}
</script>

<style>
</style>
