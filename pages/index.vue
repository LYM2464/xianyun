<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel height="700px" :interval="2000">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div class="banner">
          <img :src="$axios.defaults.baseURL+item.url" />
        </div>
      </el-carousel-item>

      <!-- 搜索框 -->
      <div class="search-content">
        <div class="search-bar">
          <!-- Tab -->
          <el-row type="flex" class="search-tab">
            <span
              v-for="(item, index) in options"
              :key="index"
              :class="{ active: index === currentOption }"
              @click="handlerOption(index)"
            >{{ item.name }}</span>
          </el-row>

          <!-- 输入框 -->
          <el-row type="flex" align="middle" class="search-input">
            <input :placeholder="options[currentOption].placeholder" v-model="searchValue" />
            <i class="el-icon-search"></i>
          </el-row>
        </div>
      </div>
    </el-carousel>
  </div>
</template>

<script>
export default {
  // - 参数定义
  data() {
    return {
      banners: [],
      options: [
        // 搜索框Tab
        {
          name: "攻略",
          placeholder: "搜索城市",
          pageUrl: "/post?city="
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店",
          pageUrl: "/hotel?city="
        },
        {
          name: "机票",
          placeholder: "请输入出发地",
          pageUrl: "/air"
        }
      ],
      searchValue: "", // 搜索框的值
      currentOption: 0 // 当前选中的选项
    };
  },

  // - 函数
  methods: {
    handlerOption(index) {
      this.currentOption = index;
    }
  },

  // - 钩子
  mounted() {
    // _请求轮播图片
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      const { data } = res.data;
      this.banners = data;
    });
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
.search-content {
  z-index: 5;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .search-bar {
    width: 552px;
    span {
      width: 82px;
      height: 36px;
      display: block;
      position: relative;
      margin-right: 8px;
      cursor: pointer;
      color: #fff;
      text-align: center;
      &::before {
        z-index: -1;
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        border-bottom: none;
        transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
        transform-origin: bottom left;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1px 2px 0 0;
        box-sizing: border-box;
      }
    }
    .active {
      color: #333;

      &::before {
        background: #eee;
      }
    }
    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;
      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
