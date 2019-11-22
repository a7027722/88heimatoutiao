<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div slot="header" class="clearfix">
          <span>账户信息</span>
        </div>
        <el-form :model="userData" ref="user" label-width="100px">
        <!-- <el-form-item label="用户头像" style="float:right">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            >
            <img width="180" :src="userData.photo" class="avatar">
          </el-upload>
        </el-form-item> -->
        <el-form-item label="用户昵称">
          <el-input v-model="userData.name"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input type="textarea" v-model="userData.intro"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="userData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" >
          <el-input disabled v-model="userData.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存修改</el-button>
        </el-form-item>
      </el-form>
      </el-col>
      <el-col :span="8">
        <el-upload
          style="text-align:center"
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :http-request='onUpload'
        >
      <img width="180" :src="userData.photo" class="avatar">
      <h3 style="fontWeight:400">请点击上传你的头像</h3>
    </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import eventBus from '@/event-bus/event-bus.js'
// 引入公共文件介质 与头部的用户头像 昵称联动 >>>> home-header
export default {
  data () {
    return {
      userData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    loadUserFile () {
      this.$axios({
        method: 'GET',
        url: '/user/profile'
      }).then(res => {
        this.userData = res.data.data
      })
    },
    onSubmit () {
      // 可以单独写 也可以用解构的方式
      // const name = this.userData.name
      // const intro = this.userData.intro
      // const email = this.userData.email
      const { name, email, intro } = this.userData
      this.$axios({
        method: 'PATCH',
        url: '/user/profile',
        // data: this.userData 直接写可以或者
        data: {
          name,
          email,
          intro
        }
      }).then(res => {
        // 数据是双向绑定的 视图已更新 运行到这里 数据已经存到了数据库 刷新页面 不影响
        // 数据 页面与服务器数据已同步
        this.$message({
          type: 'success',
          message: '保存成功'
        }).catch(() => {
          this.$message.error('保存失败!')
        })
      })
    },
    onUpload (config) {
      // 当上传方式不是post时 需要用到组件的:http-request的方法 默认参数config
      const fd = new FormData()
      // 通过config获得图片地址 添加到实例fd中 既得到需要参数
      fd.append('photo', config.file)
      this.$axios({
        method: 'PATCH',
        url: '/user/photo',
        data: fd
      }).then(res => {
        this.userData.photo = res.data.data.photo
        // 组件通信 发布端 把修改好的user信息传给介质
        eventBus.$emit('upload', this.userData)
      })
    }
  },
  created () {
    this.loadUserFile()
  }
}
</script>

<style>
</style>
