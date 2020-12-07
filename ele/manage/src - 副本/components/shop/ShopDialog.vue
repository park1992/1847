<template>
	<!-- <el-dialog title="添加店铺类别" :visible.sync="shopTypeVisible"> -->
	<!-- <el-dialog title="添加店铺类别" :visible="shopTypeVisible" @update:visible="bol=>shopTypeVisible=bol"> -->
	<el-dialog :title="title" :visible="shopVisible" @update:visible="bol=>$emit('update:shopVisible',bol)">
		<el-form>
			<el-form-item label="店铺名称" label-width="120px">
				<el-input v-model="shopInfo.shopName" style="width: 300px;" autocomplete="off"></el-input>
			</el-form-item>
	
			<el-form-item label="店铺类别" label-width="120px">
				<!-- 下拉菜单，v-mode的值相对应:value的值 ，:label是对应的汉字，相当于mustache语法-->
				  <el-select v-model="shopInfo.shopTypeId" placeholder="请选择">
				    <el-option 
					v-for="item in $store.state.shop.allShopTypeList" 
					:key="item._id"
					:label="item.shopTypeName"
					:value="item._id"
					>	
				    </el-option>
				  </el-select>
			</el-form-item>
			
			<el-form-item label="店铺图片" label-width="120px">
				<!-- data:增加数据 headers：传递token，auto-upload手动上传，limit上传图片数量 ，file-list修改时使用-->
				<el-upload 
				class="upload-demo" 
				action="/ele/shopList" 
				name="shopPic" 
				:on-success = "success"
				:data="shopInfo" 
				:headers="{authorization:$store.state.admin.token}"
				:auto-upload="false" 
				:file-list="fileList"
				:limit="1" 
				ref="upload" 
				list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>
	
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="$emit('update:shopVisible',false)">取 消</el-button>
			<el-button type="primary" @click="submitForm">确 定</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default{
		name:"ShopDiaLog",
		props:{
			shopTypeId:{
				type:String,
				default:""
			},
			shopId:{     //根据Id从数据库拿出来数据渲染到弹出框，对应mounted方法
				type:String,
				default:""
			},
			shopVisible:{
				type:Boolean,
				default:false
			},
			info:{  //从该节点拿出的数据渲染到弹出层，对应created方法(watch,update),后info换成了shopId，该传递的值所以可以注释掉了
				type:Object,
				default(){
					return{}
				}
			}
		},
		  created(){
            // console.log(2222,this.shopTypeId);
           if(this.shopTypeId.length>0){
               // 表单当中的店铺类别由this.shopInfo.shopTypeId
               this.shopInfo.shopTypeId = this.shopTypeId;
           }
        },
		data(){
			return{
				title:"添加店铺",
				shopInfo:{
					_id:"",
					shopName:"",
					shopTypeId:""
				},
				fileList:[]
			}
		},
		/* watch:{     //针对shopList中shop-dialog没有v-if的情况的写法
			   info:{
				   handler(){
					   console.log(11111111111);
					   this.fileList=[];
					   if(this.info._id){
						   this.shopInfo.shopName = this.info.shopName;
						   this.shopInfo.shopTypeId = this.info.shopTypeId;
						   this.fileList.push({
							   name:this.info.shopPic,
							   url:"/ele/"+this.info.shopPic
						   })
					   }else{
						   this.shopInfo.shopName = "";
						   this.shopInfo.shopTypeId = "";
					   }
				   },
				   deep:true
			   }
			}, */
		/* updated() {    //针对shopList中shop-dialog没有v-if的情况的写法
			// 更新数据
			if(this.info._id !== this.shopInfo._id){
				this.shopInfo._id = this.info._id
				this.fileList = []
				if(this.info._id){
					this.shopInfo.shopName = this.info.shopName;
					this.shopInfo.shopTypeId = this.info.shopTypeId;
					this.fileList.push({
						name:this.info.shopPic,
						url:"/ele/"+this.info.shopPic
						
					})
				}else{
					this.shopInfo.shopName = '';
					this.shopInfo.shopTypeId = '';
				}
			}
			console.log(this.fileList)
		}, */
		
	/* 	created(){ //存放同步操作
		// console.log("created");
			if(this.info._id){
				// this.title="修改店铺";
				this.shopInfo.shopName = this.info.shopName;
				this.shopInfo.shopTypeId = this.info.shopTypeId;
				this.fileList.push({
					name:this.info.shopPic,
					url:"/ele/"+this.info.shopPic
					
				})
			}
		}, */
		
		async mounted() {
			// 拿到相关数据（店铺类别id和店铺类别名）留作增加店铺时使用，
			this.$store.dispatch("getAllShopTypeList");
			if(this.shopId.length>0){
				this.title="修改店铺";
				const {shopInfo} = await this.$axios.get("/shopInfo/"+this.shopId);
				this.shopInfo.shopName = shopInfo.shopName;
				this.shopInfo.shopTypeId = shopInfo.shopTypeId;
				this.fileList.push({
					name:shopInfo.shopPic,
					url:"/ele/"+shopInfo.shopPic
					
				})
			}	
		},
		methods:{
			success(){
				//提交成功 隐藏弹出层,     难点，事件传值
				this.$emit('update:shopVisible',false);
				this.$store.dispatch("getShopList");
			},
			submitForm(){
				this.$refs.upload.submit();
			}
		},
		/* destroyed() {   //shopList中加v-if，此处销毁才会执行
			console.log("destroyed")
		} */
	}
</script>

<style>
</style>
