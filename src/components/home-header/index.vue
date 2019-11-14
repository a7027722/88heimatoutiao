<template>
  <div>
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="7" class="header-left">
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="3" class="header-right">
        <img src="../../assets/img/avatar.jpg" alt />
        <el-dropdown trigger="click">
          <span>
            嗷嗷棒
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>账户信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.header-left {
  // 侧轴居中
  display: flex;
  align-items: center;
  i {
    font-size: 24px;
  }
  span {
    margin-left: 4px;
  }
}
.header-right {
  //侧轴居中
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    margin-right:5px;
  }
}
</style>
