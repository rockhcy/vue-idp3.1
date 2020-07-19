<template>
  <div class="login-d">
    <div class="login-form">
      <div class="login-t-d">
        <el-row>
          <el-col>
            和信智能数据分析平台
          </el-col>
        </el-row>
      </div>

      <el-form ref="form"
               :model="form"
               label-width="80px"
               class="login-f">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <div>
          <template>
            <!-- `checked` 为 true 或 false -->
            <el-checkbox v-model="checked"
                         class="rememberMe">记住密码</el-checkbox>
          </template>
        </div>

        <el-form-item>
          <el-button type="primary"
                     class="login-sub"
                     @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''

      },
      checked: false
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!');
      if (this.form.username == '' || this.form.password == '') {
        return this.open4("账户或密码不能为空");
      }
      this.form.rememberMe = this.checked;
      console.log(this.form)
      this.$http.post("/auth/login", this.form).then(res => {
        console.log(res);
        if (res.status == 200) {
          sessionStorage.setItem("token", res.headers.authorization);
          return this.$router.push('/home/index')
        }
        if (res.status == 401) {
          return this.open4("用户名或密码错误");
        }

        return this.open4("未知错误，请联系管理员！");
      }).catch(err => {
        console.log(err)
      })

      //this.$router.push('/home/index')
    },
    open4 (msg) {
      this.$notify.error({
        title: '错误',
        message: msg
      });
    }
  },

}
</script>
<style lang="scss">
.login-d {
  background-image: url("../../assets/login.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}
.login-title {
  font-size: 30px !important;
}
.login-t-d {
  font-size: 30px;
  text-align: center;
  margin: 26px;
}
.login-f {
  margin-right: 26px;
}
.login-form {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 30%;
  height: 30%;
  background: #ffffff;
}
.login-sub {
  width: 100%;
}
.rememberMe {
  float: right;
}
</style>
