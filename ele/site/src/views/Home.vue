<template>
	<div class="home">
		<MyHeader></MyHeader>
	    <div class="search_wrap">
	        <div class="shop_search" @click="$router.push('/search')">
	            <i class="iconfont iconxingtaiduICON_sousuo--"></i>
	            搜索饿了么商家 商品名称
	        </div>
	    </div>
	
	    <!-- 轮播图 -->
	   <div id="container">
			<mt-swipe :auto="4000" class="entries">
			  <mt-swipe-item class="entry_wrap" v-for="(item,index) in shopTypeList" :key="index">
				 <div class="foodentry" @click="$router.push('/shoplist/'+info._id+'.html')" :key="info._id" v-for="info in item">
					<div class="img_wrap">
					    <img :src="'/ele/'+info.shopTypePic">
					</div>
					<span>{{info.shopTypeName}}</span>
				 </div> 
			  </mt-swipe-item>  
			</mt-swipe>
	    </div>
	
	    <!-- 推荐商家 -->
	    <div class="shoplist-title">推荐商家</div>
	    <div class="shoplist">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
	        <section 
				v-for="item in shopList" 
				@click="$router.push('/shopDetail/'+item._id+'.html')" 
				:key="item._id"
				class="index-container">
	            <div class="index-shopInfo">
	                <!-- 左侧图片 -->
	                <div class="logo_container">
	                    <img :src="'/ele/'+item.shopPic">
	                </div>
	                <!-- 右侧内容 -->
	                <div class="index_main">
	                    <!-- 第一行 品牌 -->
	                    <div class="index_shopname">
	                        <i>品牌</i>
	                        <span>{{item.shopName}}</span>
	                    </div>
	                    <!-- 第二行 星级 -->
	                    <div class="index-rateWrap">
	                        <div>
	                            <span>月售12单</span>
	                        </div>
	                        <div class="delivery">
	                            <span class="icon-hollow">蜂鸟专送</span>
	                        </div>
	                    </div>
	
	                    <!-- 第三行 配送 -->
	                    <div class="index-moneylimit">
	                        <div>
	                            <span>¥20起送</span>
	                            |
	                            <span>配送费¥5</span>
	                        </div>
	                        <div class="index-distanceWrap">
	                            <span>1.5km</span>
	                            |
	                            <span>10分钟</span>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </section>
			</mt-loadmore>
	    </div>
	</div>
</template>

<script>
	export default{
		name:'Home',
		data(){
			return{
				shopTypeList:[],
				shopList:[],
				pageIndex:1,
				allLoaded:false
			}
		},
		components:{
			MyHeader:()=>import("@/components/home/MyHeader.vue")
		},
		methods:{
			// 下拉刷新
			async loadTop() {
				const res = await this.$axios.get("/ele/shopList",{
			 	params:{pageIndex:1}
			 });
			  this.shopList = res.data.shopList;
			  this.$refs.loadmore.onTopLoaded();  //加载完成
			},
			// 上拉加载
			async loadBottom() {
				this.pageIndex++
			    const res = await this.$axios.get("/ele/shopList",{
			  	params:{
					pageIndex:this.pageIndex
				}
			  });
			  this.shopList = [
				  ...this.shopList,
				  ...res.data.shopList
			  ];
			  if(res.data.pageIndex===res.data.pageSum){
				  this.allLoaded = true;// 若数据已全部获取完毕
			  }
			  this.$refs.loadmore.onBottomLoaded();
			}
			
		},
		async mounted() {	
			const {data} = await this.$axios.get("/ele/shopTypeList");
			// console.log(data);
			this.shopTypeList = data.shopTypeList;
			
			const res = await this.$axios.get("/ele/shopList",{
				params:{pageIndex:1}
			});
			this.shopList = res.data.shopList;
			// console.log(res.data.shopList);
			
			//加载天气查询插件
			/* AMap.plugin('AMap.Weather', function() {
			    //创建天气查询实例
			    var weather = new AMap.Weather();
			
			    //执行实时天气信息查询
			    weather.getLive('宿迁市', function(err, data) {
			        console.log(err, data);
			    });
			}); */
		}
	}
</script>

<style scoped>
	/****************首页*******************************************/
	.home {
	  width: 100%;
	  height: 100%;
	  overflow: auto;
	  box-sizing: border-box;
	}
	.header,
	.search_wrap {
	  background-color: #009eef;
	  padding: 10px 16px;
	}
	.header .address_map {
	  color: #fff;
	  font-weight: bold;
	}
	.address_map i {
	  margin: 0 3px;
	  font-size: 18px;
	}
	.address_map span {
	  display: inline-block;
	  width: 80%;
	  overflow: hidden;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	}
	.search_wrap .shop_search {
	  /* margin-top: 10px; */
	  background-color: #fff;
	  padding: 10px 0;
	  border-radius: 4px;
	  text-align: center;
	  color: #aaa;
	}
	
	.search_wrap {
	  position: sticky;
	  top: 0px;
	  z-index: 999;
	  box-sizing: border-box;
	}
	
	.fixedview {
	  width: 100%;
	  position: fixed;
	  top: 0px;
	  z-index: 999;
	}
	/****************swiper************************************************/
	.entries {
	  background: #fff;
	  height: 47.2vw;
	  text-align: center;
	  overflow: hidden;
	}
	.foodentry {
	  width: 20%;
	  float: left;
	  position: relative;
	  margin-top: 2.933333vw;
	}
	.foodentry .img_wrap {
	  position: relative;
	  display: inline-block;
	  width: 12vw;
	  height: 12vw;
	}
	.img_wrap img {
	  width: 100%;
	  height: 100%;
	}
	.foodentry span {
	  display: block;
	  color: #666;
	  font-size: 0.32rem;
	}
	/* 推荐商家 */
	.shoplist-title {
	  display: flex;
	  align-items: flex;
	  justify-content: center;
	  height: 9.6vw;
	  line-height: 9.6vw;
	  font-size: 16px;
	  color: #333;
	  background: #fff;
	}
	.shoplist-title:after,
	.shoplist-title:before {
	  display: block;
	  content: "一";
	  width: 5.333333vw;
	  height: 0.266667vw;
	  color: #999;
	}
	.shoplist-title:before {
	  margin-right: 3.466667vw;
	}
	.shoplist-title:after {
	  margin-left: 3.466667vw;
	}
	
	.fixedview {
	  width: 100%;
	  position: fixed;
	  top: 0px;
	  z-index: 999;
	}
	/* 商家列表 */
	.index-container {
	  background: #fff;
	  color: #666;
	  padding: 4vw 0;
	  border-bottom: 0.133333vw solid #eee;
	}
	.index-shopInfo {
	  display: flex;
	  justify-content: flex-start;
	  padding: 0 2.666667vw;
	  align-items: stretch;
	}
	.logo_container {
	  width: 17.333333vw;
	  height: 17.333333vw;
	}
	.logo_container img {
	  display: block;
	  width: 100%;
	  height: 100%;
	  box-sizing: border-box;
	  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
	  border-radius: 0.533333vw;
	}
	.index_main {
	  display: flex;
	  justify-content: space-between;
	  overflow: hidden;
	  flex-direction: column;
	  padding-left: 2.666667vw;
	  font-size: 0.2rem;
	  flex-grow: 1;
	}
	.index_shopname {
	  align-items: center;
	  color: #333;
	  font-weight: 700;
	  font-size: 0.9rem;
	}
	.index_shopname i {
	  background: #ffe800;
	  margin-right: 1.333333vw;
	  padding: 0.266667vw 0.666667vw;
	  text-align: center;
	  white-space: nowrap;
	  font-size: 0.6rem;
	}
	.index_shopname span {
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
	.index-rateWrap {
	  display: flex;
	  align-items: center;
	  overflow: hidden;
	  justify-content: space-between;
	}
	
	.index-rateWrap .rate {
	  margin-right: 1.066667vw;
	}
	.index-moneylimit {
	  width: 100%;
	  display: flex;
	  justify-content: space-between;
	}
	.index-moneylimit .index-distanceWrap {
	  color: #999;
	}
	.delivery {
	  display: flex;
	  align-items: center;
	  font-size: 0.6rem;
	  margin-left: 1.066667vw;
	}
	.delivery .icon-hollow {
	  color: #fff;
	  background-color: #2395ff;
	  padding: 2px;
	  box-sizing: border-box;
	}
</style>
