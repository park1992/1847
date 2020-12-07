<template>
	<div>
		<div class="toolbar">
			<el-form :inline="true" class="demo-form-inline">
				<el-form-item>
					<el-input placeholder="请输入搜索店铺的关键字"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary">查询</el-button>
				</el-form-item>

				<el-form-item>
					<el-button type="success" @click="shopId=''; shopVisible=true">增加店铺</el-button>
					<el-button type="success" @click="shopTypeVisible=true">增加店铺类别</el-button>
				</el-form-item>
			</el-form>
		</div>
		
		<el-table
				:data="$store.state.shop.shopList" 
				style="width: 100%"
				:border="true" 
				:v-loading="$store.state.isLoading"
				>
			<el-table-column label="id" width="210">
				<!--                插槽    -->
				<template slot-scope="scope">
					{{scope.row._id}}
				</template>
			</el-table-column>
			
			<el-table-column label="创建日期" width="190">
				<!-- 插槽 匿名，具名，插槽作用域-->
				<template slot-scope="scope">
					<i class="el-icon-time"></i>
					<span style="margin-left: 10px">{{ scope.row.addTime | date}}</span>
				</template>
			</el-table-column>
			
			<el-table-column label="店铺类别的名字" width="160">
				<template slot-scope="scope">
					{{scope.row.shopTypeName}}
				</template>
			</el-table-column>
			
			<el-table-column label="店铺名字" width="100">
				<template slot-scope="scope">
					{{scope.row.shopName}}
				</template>
			</el-table-column>
		
			<el-table-column label="店铺的图片" width="130">
				<template slot-scope="scope">
					<img height="100px" :src="'/ele/'+scope.row.shopPic" alt=""/>
				</template>
			</el-table-column>
			
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" type="danger" @click="shopTypeId=scope.row.shopTypeId;shopId=scope.row._id;goodsTypeVisible=true">增加商品类别</el-button>
					<!-- 重新获取，以防别人改动，页面没更新 -->
					<el-button size="mini" type="primary" @click="shopId=scope.row._id;shopVisible=true">修改</el-button>
					<el-button size="mini" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<PageList actionName="getShopList"></PageList>
		<!-- v-if重新渲染弹出层 -->
		<shop-type-dialog v-if="shopTypeVisible" :shopTypeVisible.sync="shopTypeVisible"></shop-type-dialog>
		<shop-dialog v-if="shopVisible" :shopId=shopId :shopVisible.sync="shopVisible"></shop-dialog>
		<GoodsTypeDialog :shopTypeId="shopTypeId" :shopId="shopId" v-if="goodsTypeVisible" :goodsTypeVisible.sync="goodsTypeVisible"></GoodsTypeDialog>
	</div>
</template>

<script>
	export default{
		name:"ShopList",
		data(){
			return {
				shopTypeVisible:false,
				shopVisible:false,
				shopId:"",
				goodsTypeVisible:false,
				shopTypeId:""
				
			}
		}
	}
</script>

<style>
</style>
