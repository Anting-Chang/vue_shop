<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avator_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-check" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" plain @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const result = await this.$http.post('login', this.loginForm)
        if (result.data.meta.status !== 200) {
          return this.$message.error('登陆失败！')
        }
        console.log(result)
        this.$message.success('登陆成功')
        window.sessionStorage.setItem('token', result.data.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avator_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
  .login_form {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>
