<template>
  <div>
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="7" class="header-left">
        <i class="el-icon-s-fold"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="3" class="header-right">
        <img height="40" :src="user.photo"/>
        <el-dropdown trigger="click">
          <span>{{ user.name }}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>账户信息</el-dropdown-item>
            <el-dropdown-item>git地址</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import eventBus from '@/event-bus/event-bus.js'
// 引入公共文件介质 与账户信息修改联动 >>> account
export default {
  data () {
    return {
      user: {
        name: '',
        photo: ''
      }
    }
  },
  created () {
    this.loadUser()
    // 在接收端 接收参数 绑定user 实现数据驱动
    eventBus.$on('upload', user => {
      this.user = user
    })
  },
  methods: {
    onLogout () {
      this.$confirm('你确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    loadUser () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        this.user = res.data.data
      })
    }
  }
}
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
    margin-right: 5px;
  }
}
</style>
