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
					<el-button type="success" @click="dialogFormVisible=true">增加店铺类别</el-button>
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
					<el-button size="mini" type="danger">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		
		<!-- <PageList actionName="getShopTypeList" :keyWord="shopTypeName"></PageList> -->
													<!-- 传递的是对象 -->
		<PageList actionName="getShopTypeList" :query="{keyWord:shopTypeName,_id:1}"></PageList>
		<el-dialog title="添加店铺类别" :visible.sync="dialogFormVisible">
			<el-form>
				<el-form-item label="店铺类别名称" label-width="120px">
					<el-input v-model="shopInfo.shopTypeName" style="width: 300px;" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="店铺类别的图片" label-width="120px">
					<!-- data:增加数据 headers：传递token，auto-upload手动上传，limit上传图片数量 -->
					<el-upload 
					class="upload-demo" 
					action="/ele/shopTypeList" 
					:on-success = "success"
					:data="shopInfo" 
					:headers="{authorization:$store.state.admin.token}"
					 :auto-upload="false" :limit="1" name="shopTypePic" ref="upload" list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: "shopTypeList",
		data() {
			return {
				dialogFormVisible: false,
				shopInfo: {
					shopTypeName: '' //双向绑定弹出层的店铺类别名称输入框
				},
				// 双向绑定查询框
				shopTypeName:''
			}
		},
		methods: {
			// 上传成功以后执行
			success(){
				//提交成功 隐藏弹出层
				this.dialogFormVisible = false;
				// 调用store->shop下面的action中的getShopTypeList方法直接显示在页面
				this.$store.dispatch("getShopTypeList");
			},
			submitForm() {
				// 提交店铺类别信息
				this.$refs.upload.submit();
			}
		}
	}
</script>

<style>
</style>
