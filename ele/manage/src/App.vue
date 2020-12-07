<template>
	<!-- 用若干插件组件写出下面内容 -->
  <el-container>
    <el-header>
      <el-row>
        <el-col class="logo" :span="8" :style="{width:isCollapse?'64px':'240px'}">
          <strong>{{isCollapse?'饿':'饿了么管理系统'}}</strong>
        </el-col>
        <el-col class="info" :span="8">
          <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="isCollapse=!isCollapse"></i>
        </el-col>
        <el-col :span="8" class="adminInfo">
          <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <span>{{$store.state.admin.adminName}}</span> <img src="./assets/logo.png" alt="">
                        </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="$store.commit('OUT_LOGIN')">退出登陆</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside  :style="{width:isCollapse?'auto':'240px'}">
<!--        router:布尔值，如果值为true说明我要开启路由模式
            default-active:将哪一个路由设置为选中项。-->
        <el-menu :collapse-transition="false" :router="true" :default-active="$route.path" class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">管理员设置</span>
            </template>
<!--            index:路由跳转的地址-->
            <el-menu-item index="/">管理员日志</el-menu-item>
            <el-menu-item index="/adminList">管理员列表</el-menu-item>
            <el-menu-item index="/upPassWord">修改密码</el-menu-item>
          </el-submenu>


          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">店铺管理</span>
            </template>
            <el-menu-item index="/shopTypeList">店铺类别列表</el-menu-item>
            <el-menu-item index="/shopList">店铺列表</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="/goodsTypeList">商品类别列表</el-menu-item>
            <el-menu-item index="/goodsList">商品列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        // 是否折叠
        isCollapse: false
      }
    },
    methods:{
      fn(){
        console.log(121212);
      }
    }
  }
</script>
<style lang="less">
  *{
    padding:0;
    margin:0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 1000px;
  }
  .el-header {
    padding: 0px!important;
    background: #409EFF;
    color: #ffffff;
    .info{
      font-size:30px;
      line-height: 60px;
    }
    .logo {
      text-align:center;
      width: 240px;
      font-size: 25px;
      line-height: 60px;
      border-right: 1px solid rgba(238, 241, 146, 0.3);
    }
    .adminInfo {
      float: right;
      text-align: right;
      padding-right: 20px;
      line-height: 60px;
      .el-dropdown-link {
        span {
          color: #fff;
        }
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
    }
  }
  .toolbar {
    background:#f4f4f4;
    padding:10px;
    marign:20px 0!important;
  }
  .el-table th,.el-table td{
    text-align:center!important;
  }
  .toolbar .el-form-item{
    margin-bottom:0px;
  }
</style>
