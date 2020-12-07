<template>
	<div>
		<EleHeader><h1 class="header-title" >{{shopInfo.shopName}}</h1></EleHeader>
		<!-- <h3>{{shopInfo.shopName}}</h3> -->
		<img v-if="shopInfo.shopPic" :src="'/ele/'+shopInfo.shopPic"/>
	</div>
</template>

<script>
	export default{
		name:"ShopDetail",
		data(){
			return{
				shopInfo:{}
			}
		},
		async mounted(){
			const {data} = await this.$axios.get("/ele/shopInfo/"+this.$route.params.shopId);
			// console.log(data.shopInfo);
			this.shopInfo = data.shopInfo;
			
			const goodsTypeRes = await this.$axios.get("/ele/goodsTypeList/"+this.$route.params.shopId);
			console.log(goodsTypeRes);   //有的没有goodsTypeList
			// console.log(goodsTypeRes.data.goodsTypeList)
		}
	}
</script>

<style scoped>
	div{
		padding-top: 45px;
	}
	img{
		width: 300px;
		height: 200px;
	}
</style>
