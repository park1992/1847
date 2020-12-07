<template>
        <div class="index">
             <router-view></router-view>
			 
          <!--头部-->
		  <TabBar></TabBar>
        </div>
</template>

<script>
	import TabBar from '../components/TabBar.vue'
    export default {
        name: "Index",
		components:{
			TabBar
		}
    }
</script>

<style scoped>
	.index {
	  width: 100%;
	  height: calc(100% - 45px);
	}
</style>