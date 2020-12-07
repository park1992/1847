<template>
	<!-- <el-dialog title="添加店铺类别" :visible.sync="shopTypeVisible"> -->
	<!-- <el-dialog title="添加店铺类别" :visible="shopTypeVisible" @update:visible="bol=>shopTypeVisible=bol"> -->
	<el-dialog :title="title" :visible="shopTypeVisible" @update:visible="bol=>$emit('update:shopTypeVisible',bol)">
		<el-form>
			<el-form-item label="店铺类别名称" label-width="120px">
				<el-input v-model="shopInfo.shopTypeName" style="width: 300px;" autocomplete="off"></el-input>
			</el-form-item>
	
			<el-form-item label="店铺类别的图片" label-width="120px">
				<!-- data:增加数据 headers：传递token，auto-upload手动上传，limit上传图片数量 ，file-list修改时使用-->
				<el-upload 
				class="upload-demo" 
				action="/ele/shopTypeList" 
				:on-success = "success"
				:data="shopInfo" 
				:headers="{authorization:$store.state.admin.token}"
				:file-list="fileList"   
				 :auto-upload="false" 
				 :limit="1" 
				 name="shopTypePic" 
				 ref="upload" 
				 list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>
	
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('update:shopTypeVisible',false)">取 消</el-button>
			<el-button type="primary" @click="submitForm">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default{
		name:"ShopTypeDiaLog",
		props:{
			shopTypeVisible:{
				type:Boolean,
				default:false
			},
			info:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				fileList:[],
				title:"添加店铺类别",
				// 想办法在父级控制子的dialogFormVisible
				dialogFormVisible: true,
				shopInfo: {
					shopTypeName: '' //双向绑定弹出层的店铺类别名称输入框
				}
			}
		},
		methods: {
			/* fn(bol){
				console.log(bol,11111111111111)
			}, */
			// 上传成功以后执行
			success(){
				//提交成功 隐藏弹出层,     难点，事件传值
				this.$emit('update:shopTypeVisible',false)
				// 判断当前页，决定是否跳转还是重新加载
				if(this.$route.name==="shopTypeList")
					this.$store.dispatch("getShopTypeList")
					// 调用store->shop下面的action中的getShopTypeList方法直接显示在页面
				else this.$router.push('/shopTypeList')
				
			},
			async submitForm() {
				// 如果存在Id的话
				if(this.info._id){
					// 修改提交
					const formdata = new FormData();
					for(let key in this.shopInfo){
						formdata.set(key,this.shopInfo[key]);
					}
					formdata.set("shopTypeId",this.info._id); //添加店铺类别ID
					formdata.set("shopTypeName",this.shopInfo.shopTypeName);  //添加店铺类别名
					formdata.set("shopTypePic",document.querySelector(".el-upload__input").files[0]);
					const data = await this.$axios.put("/shopTypeList",formdata)
					// console.log(data);
					if(data.ok === 1){
					    this.success();
					}else{
					    alert(data.msg);
					}
					}else{
				// 提交店铺类别信息，添加提交
				this.$refs.upload.submit();
				}
			}
		},
		// created重新
		created() {
			// 修改相关信息，created不会重新渲染视图，cerated常用于初始化数据
			if(this.info._id){
				this.title="修改店铺类别";
				this.shopInfo.shopTypeName = this.info.shopTypeName;
				// 把获得的这一组数据中的内容渲染到弹出框中，留作修改使用
				this.fileList.push({
					// name:this.info.shopTypeName,     //图片旁边的名字
					name:this.info.shopTypePic,
					url:"/ele/"+this.info.shopTypePic
				})
			}
		},
		// 同步操作，不推荐mounted
		/* mounted() {
			if(this.info._id){
				this.title="修改店铺列表";
				this.shopInfo.shopTypeName = this.info.shopTypeName;
			}
		} */
	}
</script>

<style>
</style>
