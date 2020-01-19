<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    let username = function(rule, value, callback) {
      // console.log(rule);
      // console.log(value);
      // console.log(callback);
      if (!value) {
        return callback(new Error("请输入账号"));
      }
    };
    let password = function(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入密码"));
      }
    };
    return {
      // _用户信息
      form: {
        username: "13800138000",
        password: "123456"
      },
      // _表单规则
      rules: {
        username: [{ validator: username, targger: true }],
        password: [{ required: true, message: "请输入密码", targger: true }]
      }
    };
  },

  // - 函数
  methods: {
    // _login
    handleLoginSubmit() {
      console.log(this.form);
      this.$refs["form"].validate(valid => {
        // 为true表示没有错误
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: this.form
          }).then(res => {
            console.log(res.data);
          });
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>