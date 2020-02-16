<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FilghtsFilters :data="flightsData" @getData="getData" @screenReset="setDataList" />

        <!-- 航班头部布局 -->

        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(e, i) in dataList" :key="i" :data="e" />
        <el-row type="flex" justify="center" style="margin-top:10px;">
          <!-- size-change：切换条数时候触发 -->
          <!-- current-change：选择页数时候触发 -->
          <!-- current-page: 当前页数 -->
          <!-- page-size：当前条数 -->
          <!-- total：总条数 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsData.total"
          ></el-pagination>
        </el-row>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead";
import FlightsItem from "@/components/air/flightsItem";
import FilghtsFilters from "@/components/air/flightsFilters";
import FlightsAside from "@/components/air/flightsAside";

export default {
  data() {
    return {
      // _航班总数据
      flightsData: { info: {}, options: {}, flights: [] },
      // _航班数据
      dataList: [],
      // _当前页
      pageIndex: 1,
      // _一页的数据量
      pageSize: 5
    };
  },

  methods: {
    // _更换条目数
    handleSizeChange(val) {
      this.pageSize = val;
      this.setDataList();
    },
    // _更换页数
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.setDataList();
    },

    // _筛选渲染
    getData(arr) {
      this.pageIndex = 1;
      this.flightsData.total = arr.length;
      this.render(arr);
    },

    // _渲染条目数据设置
    setDataList() {
      let data = this.flightsData.flights;
      this.flightsData.total = this.flightsData.flights.length;
      this.render(data);
    },
    // _数据分页渲染
    render(data) {
      this.dataList = data.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
    },

    airs() {
      this.$axios({
        url: `airs`,
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;
        //   this.dataList = this.flightsData.flights;
        this.setDataList();
      });
    }
  },

  components: {
    FlightsListHead,
    FlightsItem,
    FilghtsFilters,
    FlightsAside
  },

  mounted() {
    this.airs();
  },
  beforeRouteUpdate(to, from, next) {
    this.pageIndex = 1;
    next();
    this.airs();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
