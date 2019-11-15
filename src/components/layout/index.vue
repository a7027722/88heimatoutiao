<template>
  <div>
    <el-container>
      <!-- 首页左侧菜单 -->
      <home-left></home-left>
      <el-container>
        <!-- 首页右侧头部 -->
        <el-header>
          <home-header></home-header>
        </el-header>
        <!-- 首页右侧下部 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import homeLeft from '../../components/home-left'
import homeHeader from '../../components/home-header'
export default {
  components: {
    'home-left': homeLeft,
    'home-header': homeHeader
  }
}
</script>

<style lang="less" scoped>
</style>
