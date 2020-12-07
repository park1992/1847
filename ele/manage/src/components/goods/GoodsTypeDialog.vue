<template>
	<el-dialog title="添加商品类别" :visible="goodsTypeVisible" @update:visible="bol=>$emit('update:goodsTypeVisible',bol)">
		<el-form>
			<el-form-item label="商品类别名称" label-width="120px">
				<el-input v-model="goodsTypeInfo.goodsTypeName" style="width: 300px;" autocomplete="off"></el-input>
			</el-form-item>
	
			<el-form-item label="所属店铺" label-width="120px">
				  <el-select @change="changeShopTypeId" v-model="goodsTypeInfo.shopTypeId" placeholder="请选择店铺类别">
					<el-option
					v-for="item in $store.state.shop.allShopTypeList" 
					:key="item._id"
					:label="item.shopTypeName"
					:value="item._id"
					>	
					</el-option>	
				  </el-select>
				  <el-select placeholder="请选择店铺" v-model="goodsTypeInfo.shopId">
				  	  <el-option v-for="item in $store.state.shop.shopListByTypeId"
					  :key="item._id"
					  :value="item._id"
					  :label="item.shopName"
					  >
					  </el-option>			
				  </el-select>
			</el-form-item>
			
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('update:goodsTypeVisible',false)">取 消</el-button>
			<el-button type="primary" @click="addGoodsTypeList">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default{
		name:"GoodsTypeDialog",
		props:{
			goodsTypeVisible:{
				type:Boolean,
				default:false
			},
			shopTypeId:{
				type:String,
				default:""
			},
			shopId:{
				type:String,
				default:""
			},
		},
		methods:{
			async addGoodsTypeList(){
				const data = await this.$axios.post("/goodsTypeList",{
					shopId:this.goodsTypeInfo.shopId,
					goodsTypeName:this.goodsTypeInfo.goodsTypeName
					
				})
				this.$store.dispatch("getGoodsTypeList");
				// 点击确定按钮，关闭弹出层，子用$emit,父方法
				
				this.$emit("update:goodsTypeVisible",false);
				
				if(this.$route.name==="shopList")         //写了没有用，不跳转，此处打印也没有效果
					this.$store.dispatch("getShopList")
					// 调用store->shop下面的action中的getShopList方法直接显示在页面
				else this.$router.push('/shopList')
				
				console.log(data,111111111111);
			},
			// 改变店铺类别时，获取该店铺类别下所有的店铺
			changeShopTypeId(){
				// console.log(this.goodsTypeInfo.shopTypeId);
				this.$store.dispatch("getShopListByShopTypeId",this.goodsTypeInfo.shopTypeId);
				this.goodsTypeInfo.shopId="";  //初始化请选择店铺下拉框
			}
		},
		
		created() {
			if(this.shopTypeId.length>0){
				this.goodsTypeInfo.shopTypeId = this.shopTypeId;
			}
		},
		data(){
			return {
				goodsTypeInfo:{
					goodsTypeName:'',
					shopTypeId:'',
					shopId:''
				}
			}
		},
		mounted() {
			if(this.shopId){
				this.$store.dispatch("getShopListByShopTypeId",this.goodsTypeInfo.shopTypeId);
				this.goodsTypeInfo.shopId = this.shopId;
			};
			this.$store.dispatch("getAllShopTypeList")
		}
	}
	
</script>

<style>
</style>
