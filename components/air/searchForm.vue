<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{ active: index === currentTab }"
      >
        <i :class="item.icon"></i>
        {{ item.name }}
      </span>
    </el-row>
    <!-- 出发城市 -->
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="queryCity"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          @blur="defaultDepartSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <!-- 终点城市 -->
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryCity"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <!-- 出发时间 -->
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button
          style="width:100%;"
          type="primary"
          icon="el-icon-search"
          @click="handleSubmit"
          >搜索</el-button
        >
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: ""
      },
      cityData: []
    };
  },

  // - 函数
  methods: {
    // _tab切换时触发
    handleSearchTab(item, index) {
      this.currentTab = index;
    },

    // _查询城市异步请求
    // _value 是选中的值，cb是回调函数，接收要展示的列表
    // _键盘输入有间隔才会触发，快速连续输入不触发
    // _出发城市输入框获得焦点时触发
    queryCity(value, callBack) {
      if (value === "") {
        this.cityData = [{}];
        return callBack([]);
      }
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        const newData = data.map(function(v) {
          v.value = v.name.replace("市", "");
          return v;
        });
        this.cityData = newData;
        callBack(newData);
      });
    },

    // _出发城市下拉选择时触发
    handleDepartSelect(item) {
      console.log(item);
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },

    // _目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },

    // _用户不点击意见框时，默认选择首位
    defaultDepartSelect() {
      this.form.departCity = this.cityData[0].value;
      this.form.departCode = this.cityData[0].sort;
    },
    defaultDestSelect() {
      this.form.destCity = this.cityData[0].value;
      this.form.destCode = this.cityData[0].sort;
    },

    // _确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },

    // _触发和目标城市切换时触发
    handleReverse() {},

    // _提交表单是触发
    handleSubmit() {
      const rules = [
        {
          value: this.form.departCity,
          message: "请输入出发城市"
        },
        {
          value: this.form.destCity,
          message: "请输入终点城市"
        },
        {
          value: this.form.departDate,
          message: "请输入出发时间"
        }
      ];
      let valid = true;
      rules.forEach(item => {
        if (!valid) return;
        if (item.value === "") {
          valid = false;
          this.$confirm(item.message, "提示", {
            confirmButtonText: "确定",
            showCancelButton: false,
            type: "warning"
          });
        }
      });
      if (!valid) return;
      this.$router.push({
        path: "/air/flights",
        query: this.form
      });
    }
  },

  // - 钩子
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
