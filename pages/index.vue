<template>
  <div>
    <el-carousel height="150px">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item" alt="" />{{ item }}
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  // - 参数定义
  data() {
    return {
      banners: ["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"]
    };
  }
};
</script>

<style></style>
