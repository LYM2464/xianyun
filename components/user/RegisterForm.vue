<template>
  <el-form :model="form" ref="form" status-icon :rules="rules" class="form">
    <!-- 用户名 -->
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="手机号码" v-model="form.username"></el-input>
    </el-form-item>
    <!-- 验证码 -->
    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <el-button slot="append" @click="handleSendCaptcha"
          >发送验证码</el-button
        >
      </el-input>
    </el-form-item>
    <!-- 昵称 -->
    <el-form-item class="form-item" prop="nickname">
      <el-input
        placeholder="昵称"
        type="text"
        v-model="form.nickname"
      ></el-input>
    </el-form-item>
    <!-- 密码 -->
    <el-form-item class="form-item" prop="password">
      <el-input
        placeholder="密码"
        type="password"
        v-model="form.password"
      ></el-input>
    </el-form-item>
    <!-- 确认密码 -->
    <el-form-item class="form-item" prop="checkPassword">
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
    // _两次密码比较验证
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // _表单参数
      form: {
        username: "", // 手机号码
        nickname: "", // 昵称
        password: "", // 密码
        checkPassword: "", // 密码的再次输入
        captcha: "000000" // 验证码
      },
      // _验证规则
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },

  // - 函数
  methods: {
    // _发送验证码
    handleSendCaptcha() {
      // 判断手机号码是否为空
      if (this.form.username === "") {
        this.$message({
          showClose: true,
          message: "用户名/手机号码不能为空",
          type: "warning"
        });
        return;
      }
      // 判断手机格式是否正确
      if (!/\d{11}/.test(this.form.username)) {
        this.$message({
          showClose: true,
          message: "手机号码格式错误",
          type: "warning"
        });
        return;
      }
      // 验证码发送
      this.$store
        .dispatch("user/sendCaptcha", {
          tel: this.form.username
        })
        .then(res => {
          const { code } = res.data;
          this.$confirm(`模拟手机验证码为：${code}`, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        });
    },

    // _注册提交
    handleRegister() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$store.dispatch("user/register", this.form).then(() => {
            this.$message.success("注册成功");
            this.$router.push("/");
          });
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
