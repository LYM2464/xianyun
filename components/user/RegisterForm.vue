<template>
  <el-form :model="form" ref="form" status-icon :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="verify">
      <el-input placeholder="验证码" class="input-with-select">
        <el-button slot="append">发送验证码</el-button>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        placeholder="你的名字"
        type="password"
        v-model="form.nickname"
      ></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        placeholder="密码"
        type="password"
        v-model="form.password"
      ></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        placeholder="确认密码"
        type="password"
        v-model="form.checkPassword"
      ></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegister"
      >注册</el-button
    >
  </el-form>
</template>

<script>
export default {
  // - 参数
  data() {
    return {
      // _表单参数
      form: {
        usermane: "",
        nickname: "",
        password: "",
        checkPassword: ""
      },
      // _验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        verify: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        checkPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },

  // - 函数
  methods: {
    // _注册提交
    handleRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch("user/register", this.form);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
  .submit {
    width: 100%;
  }
}
</style>
