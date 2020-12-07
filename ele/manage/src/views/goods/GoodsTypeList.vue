<template>
	<div>
		<div class="toolbar">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input placeholder="请输入搜索商品类别的关键字"></el-input>
				</el-form-item>
		
				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>
		
				<el-form-item>
					<el-button type="success" @click="shopTypeId='';shopId=''; goodsTypeVisible=true">增加商品类别</el-button>
				</el-form-item>
			</el-form>
		</div>
	
		<el-table
				:data="$store.state.goods.goodsTypeList" 
				style="width: 100%"
				:border="true" 
				:v-loading="$store.state.isLoading"
				>
			
			<el-table-column label="商品类别名称" width="200">
				<template slot-scope="scope">
					{{scope.row.goodsTypeName}}
				</template>
			</el-table-column>
			
			<el-table-column label="创建日期" width="200">
				<!-- 插槽 匿名，具名，插槽作用域-->
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.addTime | date}}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="店铺类别的名字" width="200">
				<template slot-scope="scope">
					<a href="" @click.prevent="shopTypeId=scope.row.shopTypeId;shopId='';goodsTypeVisible=true">
					{{scope.row.shopTypeName}}
					</a>
					
				</template>
			</el-table-column>
			
			<el-table-column label="店铺名字" width="200">
				<template slot-scope="scope">
					<a href="" @click.prevent="shopTypeId=scope.row.shopTypeId;shopId=scope.row.shopId;goodsTypeVisible=true">
						{{scope.row.shopName}}
					</a>
				</template>
			</el-table-column>
			
			<el-table-column label="操作">
				<template slot-scope="scope">
					<!-- 重新获取，以防别人改动，页面没更新 -->
					<el-button size="mini" type="danger" @click="shopTypeId=scope.row.shopTypeId;shopVisible=true">增加店铺</el-button>
					<el-button size="mini" type="primary" @click="shopId=scope.row._id;shopVisible=true">修改</el-button>
					<el-button size="mini" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<PageList actionName="getGoodsTypeList"></PageList>
		<!-- 商品类别弹窗 -->
		<GoodsTypeDialog v-if="goodsTypeVisible" :shopId="shopId" :shopTypeId="shopTypeId" :goodsTypeVisible.sync="goodsTypeVisible"></GoodsTypeDialog>
		<!-- 新增店铺弹窗 -->
		<ShopDialog v-if="shopVisible" :shopTypeId="shopTypeId" :shopVisible.sync="shopVisible"></ShopDialog>
	</div>
	
</template>

<script>
	export default{
		name:"GoodsTypeList",
		data(){
			return{
				goodsTypeVisible:false,
				shopVisible:false,
				shopTypeId:"",
				shopId:""
			}
		}
	}
</script>

<style>
</style>
