<template>
	<div class="address">
		<!--头部-->
		<EleHeader>
			<h1 class="header-title">请选择收货地址</h1>
		</EleHeader>
		<div class="city_search">
			<div class="search">
				<span class="city">
					上海
					<i class="iconfont iconicon"></i>
				</span>
				<i class="iconfont iconxingtaiduICON_sousuo--"></i>
				<input type="text" @input="getLocation" placeholder="请输入地址">
			</div>

			<div>
				<div class="title">当前定位</div>
				<div class="des">
					<i class="iconfont icondaohang"></i>
					<span>上海</span>
				</div>
			</div>

		</div>
		<div class="area">
			<ul class="area_list" @click="changeLocation(index)" v-for="(item,index) in $store.state.location.tips" :key="item.id+index">
				<li>
					<h4>{{item.district}}</h4>
					<p>{{item.name+item.address}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:"Address",
		methods:{
			getLocation(e){
				// console.log(11111111);
				this.$store.dispatch("autoComplete",e.target.value)
			},
			changeLocation(index){
				this.$store.commit("CHANGE_ADDRESS",this.$store.state.location.tips[index].district+this.$store.state.location.tips[index].address);
				this.$router.push("/");
			}
		},
		// 离开时清空
		beforeRouteLeave(to,from,next) {
			this.$store.commit("CHANGE_TIPS",[]);
			next()
		}
	}
</script>

<style scoped>
	/******************address************************************************/
	.address {
		width: 100%;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
		padding-top: 45px;
	}

	.city_search {
		background-color: #fff;
		padding: 10px 20px;
		color: #333;
	}

	.search {
		background-color: #eee;
		height: 40px;
		border-radius: 10px;
		box-sizing: border-box;
		line-height: 40px;
	}

	.search .city {
		padding: 0 10px;
	}

	.city i {
		margin-right: 10px;
	}

	.search input {
		margin-left: 5px;
		background-color: #eee;
		outline: none;
		border: none;
	}

	.area {
		margin-top: 16px;
		background: #fff;
	}

	.area li {
		border-bottom: 1px solid #eee;
		padding: 8px 16px;
		color: #aaa;
	}

	.area li h4 {
		font-weight: bold;
		color: #333;
		margin-bottom: 5px;
	}

	.title {
		margin: 10px 0;
		font-size: 12px;
	}

	.des i {
		color: #009eef;
	}

	.des span {
		color: #333;
		font-weight: bold;
		margin-left: 5px;
		display: inline-block;
		width: 90%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	/****************头部*******************************************/
	.header {
		align-items: center;
		background-color: #009eef;
		box-sizing: border-box;
		color: #fff;
		display: flex;
		font-size: 16px;
		height: 45px;
		line-height: 1;
		padding: 0 10px;
		position: relative;
		text-align: center;
		white-space: nowrap;
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 99;
	}

	.header-button button {
		background-color: transparent;
		border: 0;
		box-shadow: none;
		color: inherit;
		display: inline-block;
		padding: 0;
		font-size: inherit;
		outline: none;
	}

	.header-title {
		flex: 1;
	}

	.is-left {
		text-align: left;
	}

	.is-right {
		text-align: right;
	}
</style>
