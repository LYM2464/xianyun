<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <div>
        <el-input placeholder="验证码" class="input-with-select">
          <el-button slot="append">发送验证码</el-button>
        </el-input>
      </div>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="你的名字" type="password" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="确认密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegister">注册</el-button>
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
        password: ""
      },
      // _验证规则
      rules: {
        usermane: [{}],
        password: [{}],
        nickname: [{}]
      }
    };
  },

  // - 函数
  methods: {
    handleRegister() {}
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