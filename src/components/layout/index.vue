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
          <!-- 当编辑与发布文章共用相同组件时 需要切换时重新渲染
          所以给容器一个key 避免vue复用相同组件时不再渲染 -->
          <router-view :key="$route.path"></router-view>
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
