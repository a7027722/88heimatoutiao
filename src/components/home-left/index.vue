<template>
  <div>
      <el-aside width="220px" class="home-left">
        <div class="menu-title" style="background-color:#2e2f32">
          <img src="../../assets/img/logo_admin.png" alt />
        </div>
        <el-menu
          style="width:221px"
          background-color="#353b4e"
          text-color="#adafb5"
          active-text-color="#ffd04b"
        >
          <el-menu-item>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">内容管理</template>
            <el-menu-item index="2-1">发布文章</el-menu-item>
            <el-menu-item index="2-2">内容列表</el-menu-item>
            <el-menu-item index="2-3">评论列表</el-menu-item>
            <el-menu-item index="2-4">素材管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">粉丝管理</template>
            <el-menu-item index="3-5">图文数据</el-menu-item>
            <el-menu-item index="3-6">粉丝概况</el-menu-item>
            <el-menu-item index="3-7">粉丝画像</el-menu-item>
            <el-menu-item index="3-8">粉丝列表</el-menu-item>
          </el-submenu>
          <el-menu-item>账户信息</el-menu-item>
        </el-menu>
      </el-aside>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.home-left {
  width: 220px;
  height: 100vh;
  background-color: #353b4e;
  overflow: hidden;
  .menu-title {
    padding: 15px 0;
    text-align: center;
    img {
      height: 30px;
    }
  }
}
</style>
