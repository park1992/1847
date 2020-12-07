<template>
	<div>
		<!-- <select v-model="city">
			<option value="1"></option>
			<option value="2">上海</option>
			<option value="3">广州</option>
			<option value="4">深圳</option>
		</select> -->
		 <input type="button" value="增加" @click="addCity">
		
		<select v-model="city">
			<option 
			v-for="item in cityList"
			:value="item.cityId" 
			:key="item.cityId" 
			:label="item.cityName">
			</option>
		</select>
		
		{{arr}}
	</div>
</template>

<script>
	export default{
		name:"Study",
		data(){
			return{
				arr:[1,2,3,4],
				city:2,
				cityList:[
					{
						cityId:1,
						cityName:"北京"
					},
					{
						cityId:2,
						cityName:"上海"
					},{
						cityId:3,
						cityName:"广州"
					},{
						cityId:4,
						cityName:"深圳"
					},
				]
			}
		},
		methods:{
			addCity(){
			   // this.city = 3;
			   this.arr[0] = 300;   //改不了
			   // this.$set(this.arr,0,600);  //可以改
			   this.cityList[0].cityName = "常州"  //可以改
			   this.cityList.push({
				   cityId:this.cityList.length +1,
				   cityName:"武汉"
			   })
			}
		}
	
	}
</script>

<style>
</style>
