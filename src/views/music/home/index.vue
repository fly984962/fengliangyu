<template>
  <div>
    <!-- 首页-------------------------------------------------------------------- -->
    <!-- 轮播 -->
    <banner />
    <!-- 热门歌单 -->
    <songHot />
  </div>
</template>

<script>
import banner from './components/banner'
import songHot from './components/songHot'
export default {
  components: {
    banner,
    songHot
  }
}
</script>

<style lang="less" scoped>

</style>