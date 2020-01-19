<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel height="700px" :interval="2000">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div class="banner">
          <img :src="item" alt />
          {{ item }}
        </div>
      </el-carousel-item>

      <!-- login -->
      <div class="login">
        <el-row type="flex" justify="center" align="middle" class="main">
          <div class="form-wrapper">
            <!-- 表单头部tab -->
            <el-row type="flex" justify="center" class="tabs">
              <span
                :class="{active: currentTab === index}"
                v-for="(item, index) in [`登录`, `注册`]"
                :key="index"
                @click="handleChangeTab(index)"
              >{{item}}</span>
            </el-row>

            <!-- 登录功能组件 -->
            <LoginForm v-if="currentTab == 0" />

            <!-- 注册功能组件 -->
            <RegisterForm v-if="currentTab == 1" />
          </div>
        </el-row>
      </div>
    </el-carousel>
  </div>
</template>

<script>
import LoginForm from "@/components/user/LoginForm";
import RegisterForm from "@/components/user/RegisterForm";
export default {
  // - 参数定义
  data() {
    return {
      // _轮播图片
      // banners: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"],
      banners: [
        "http://157.122.54.189:9095/assets/images/th03.jfif",
        "http://157.122.54.189:9095/assets/images/th04.jfif",
        "/images/1.jpg",
        "/images/4.jpg",
        "/images/5.jpg"
      ],
      currentTab: 0
    };
  },

  // - 函数
  methods: {
    // _提交登录
    handleLoginSubmit() {
      console.log(this.form);
    },

    // _tab标签切换
    handleChangeTab(index) {
      this.currentTab = index;
    },
    resetForm() {},
    submitForm() {},
    handlerOption(index) {
      this.currentOption = index;
    }
  },

  // - 组件
  components: {
    LoginForm,
    RegisterForm
  }
};
</script>

<style lang="less" scoped>
img {
  width: 100%;
  max-width: 1920px;
  max-height: 1080;
  min-width: 1200px;
  min-height: 700px;
}
.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  background: #fff;
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  .tabs {
    span {
      display: block;
      width: 50%;
      height: 50px;
      box-sizing: border-box;
      border-top: 2px #eee solid;
      background: #eee;
      line-height: 48px;
      text-align: center;
      cursor: pointer;
      color: #666;

      &.active {
        color: orange;
        border-top-color: orange;
        background: #fff;
        font-weight: bold;
      }
    }
  }
}
</style>
