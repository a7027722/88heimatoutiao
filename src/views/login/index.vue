<template>
  <div>
    <div class="login">
      <!-- 登录框 -->
      <el-card class="login-card">
        <!-- 登录框顶部logo -->
        <div class="title">
          <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单域  -->
        <!-- model绑定表单数据对象  rules 绑定校验规则对象 -->
        <el-form ref="fromObj" :model="loginForm" :rules="loginRules" style="margin-top:30px">
          <el-form-item prop="mobile">
            <!-- 手机号 -->
          <el-input v-model="loginForm.mobile" placeHolder="请输入你的手机号"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <!-- 验证码 -->
            <el-input v-model="loginForm.code" placeHolder="请输入你的验证码" style="width:270px"></el-input>
            <el-button style="float:right" plain>发送验证码</el-button>
          </el-form-item>
          <!-- 用户协议 -->
          <el-form-item prop="checked">
            <el-checkbox v-model="loginForm.checked">我已阅读并同意用户协议及条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <!-- 登录按钮 -->
            <el-button type="primary" @click="onLogin" style="width:100%">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        checked: false
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确验证码' }
        ],
        checked: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('您需要勾选用户协议'))
          }
        } }]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs.fromObj.validate((isOK) => {
        if (isOK) {
          this.$axios({
            url: '/authorizations',
            data: this.loginForm,
            method: 'POST'
          }).then(res => {
          // 存储到本地
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              type: 'warning',
              message: '手机号或者验证码错误'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .login {
    height: 100%;
    background: url(../../assets/img/login_bg.jpg);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
      width: 430px;
      height: 350px;
      .title {
      text-align: center;
      img {
        height: 45px;
      }
    }
  }
}
</style>
