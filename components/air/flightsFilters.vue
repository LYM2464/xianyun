<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item, index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <div>{{screenData}}</div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ]
    };
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      // const newData = this.data.flights.filter(v => {
      //   return v.org_airport_name === value;
      // });
      // this.$emit("getData", newData);
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      // const [from, to] = value.split(","); // [6,12]
      // const arr = this.data.flights.filter(v => {
      //   // 出发时间小时
      //   const start = +v.dep_time.split(":")[0];
      //   return start >= from && start < to;
      // });
      // this.$emit("getData", arr);
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      // const newData = this.data.flights.filter(v => {
      //   return v.airline_name === value;
      // });
      // this.$emit("getData", newData);
    },

    // 选择机型时候触发
    handleAirSize(value) {
      // const newData = this.data.flights.filter(v => {
      //   return v.airline_name === value;
      // });
      // this.$emit("getData", newData);
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = this.airSize = this.company = this.flightTimes = "";
      this.$emit("screenReset");
    }
  },

  // - 计算属性可以侦听多个属性
  computed: {
    screenData() {
      let arr = this.data.flights.filter(v => {
        let valid = true;
        if (this.airport && this.airport !== v.org_airport_name) {
          valid = false;
        }
        if (this.company && v.airline_name !== this.company) {
          valid = false;
        }
        if (this.airSize && v.plane_size !== this.airSize) {
          valid = false;
        }
        if (this.flightTimes) {
          const time = this.flightTimes.split(","); // [6,12]
          const hours = +v.dep_time.split(":")[0];
          if (Number(time[0]) > hours || hours >= Number(time[1])) {
            valid = false;
          }
        }
        return valid;
      });
      this.$emit("getData", arr);
    }
    // if (this.airport) {
    //   s = true;
    //   arr = arr.filter(v => {
    //     return this.airport === v.org_airport_name;
    //   });
    // }
    // if (this.flightTimes) {
    //   s = true;
    //   const [from, to] = this.flightTimes.split(","); // [6,12]
    //   arr = arr.filter(v => {
    //     // 出发时间小时
    //     const start = +v.dep_time.split(":")[0];
    //     return start >= from && start < to;
    //   });
    // }
    // if (this.company) {
    //   s = true;
    //   arr = arr.filter(v => {
    //     return v.airline_name === this.company;
    //   });
    // }
    // if (this.airSize) {
    //   s = true;
    //   arr = arr.filter(v => v.plane_size === this.airSize);
    // }
    // if (s) this.$emit("getData", arr);
  },

  // - 钩子
  mounted() {}
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>