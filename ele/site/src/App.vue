<template>
  <div id="app">	 
	  	<router-view></router-view>
			  
	  <!-- 
	  include属性值为路由名，包含的，会缓存 
	  exclude属性后面的是除了之外的，会缓存
	  -->
	 <!-- <keep-alive include="Login,Index">
		  <router-view></router-view>
	  </keep-alive> -->
	  <!-- 缓存上一个操作的页面，meta.isKeep是路由里设置的参数 -->
	  <!-- <keep-alive>             
		  <router-view v-if="$route.meta.isKeep" /> 
	  </keep-alive>  
      <router-view v-if="!$route.meta.isKeep"/> -->
  </div>
</template>

<style lang="less" scoped>
 #app {
    width: 100%;
    height: 100%;
    font-size: 14px;
    background: #f1f1f1;
  }

</style>
