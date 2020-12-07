<template>
	<header class="header">
		<!-- 左侧返回按钮 -->
		<div class="header-button is-left">
			<i class="iconfont iconfanhui"></i>
			<button @click="$router.go(-1)">返回</button>
		</div>
		<!-- 标题 -->
		<slot></slot>
		<!-- <h1 class="header-title">请选择收货地址</h1> -->
	</header>
</template>

<script>
	export default{
		name:"EleHeader"
	}
</script>

<style scoped>
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
</style>
