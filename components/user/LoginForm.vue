<template>
  <el-form :model="form" ref="form" status-icon :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <!-- <el-input placeholder="用户名/手机" v-model="form.username"></el-input> -->
      <input type="text" />
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <!-- <el-input placeholder="密码" type="password" v-model="form.password"></el-input> -->
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  // - 参数定义
  data() {
    // _Element组件指定的验证规则函数
    let username = function(rule, value, callback) {
      if (!value) {
        return callback(new Error("请输入账号"));
      }
      callback();
    };

    return {
      // _用户信息
      form: {
        username: "13800138000",
        password: "123456"
      },

      // _表单规则
      rules: {
        username: [{ validator: username, targger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },

  // - 函数
  methods: {
    // _login
    handleLoginSubmit() {
      this.$refs["form"].validate(valid => {
        // valid值为true表示没有错误
        if (valid) {
          this.$axios({
            url: "/accounts/login",
            method: "POST",
            data: this.form
          }).then(res => {
            console.log(res.data);
            const { data } = res;

            // 调用mutations的方法，将数据存储到store/user.js
            // this.$store.commit("user/setUserInfo", data);
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