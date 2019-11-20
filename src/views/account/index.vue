<template>
  <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>账户信息</span>
  </div>
  <el-form :model="userData" ref="user" label-width="100px">
  <el-form-item label="用户头像">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      >
      <img :src="userData.photo" class="avatar">
    </el-upload>
  </el-form-item>
  <el-form-item label="用户昵称">
    <el-input v-model="userData.name"></el-input>
  </el-form-item>
  <el-form-item label="个人介绍">
    <el-input type="textarea" v-model="userData.intro"></el-input>
  </el-form-item>
  <el-form-item label="用户邮箱">
    <el-input v-model="userData.email"></el-input>
  </el-form-item>
  <el-form-item label="手机号">
    <el-input v-model="userData.mobile"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="promary" @click="onSubmit">保存修改</el-button>
  </el-form-item>
</el-form>
</el-card>
  </div>
</template>

<script>
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

    }
  },
  created () {
    this.loadUserFile()
  }
}
</script>

<style>

</style>
