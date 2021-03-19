<template>
  <div>
    <!-- 首页-------------------------------------------------------------------- -->
    <!-- 轮播 -->
    <banner :bannerData="bannerData" />
    <!-- 热门歌单 -->
    <songHot :hotData="hotData" />
  </div>
</template>

<script>
import banner from './components/banner'
import songHot from './components/songHot'
import api from '../../../api/music/index.js'
// getHot
export default {
  components: {
    banner,
    songHot
  },
  data () {
    return {
      bannerData: [], // 轮播数组
      hotData: []
    }
  },
  mounted() {
    this.dataList()
  },
  methods: {
    dataList() {
      // 轮播接口
      api.getBanner().then(res => {
        // console.log('轮播', res)
        if (res.status == 200) {
          this.bannerData = res.data.banners
        } else {
          this.$message.error('数据请求失败')
        }
      }).catch(err => {
        this.$message.error('轮播接口丢失')
      })
      // 热门歌单接口
      api.getHot().then(res => {
        console.log('热门歌单', res)
        if (res.status == 200) {
          let tagsarr = res.data.tags.slice(0,5) // 数据中有10条歌单数据 有点多了 我们取前5个
          this.hotData = tagsarr
          console.log(res.data.tags[0].id);
          api.getCat(res.data.tags[0].name).then(res => {
            console.log('获取热门歌单', res)
          })
          // api.getBefore(1503639064232).then(res => {
          //   console.log('获取热门歌单2222', res)
          // })
        } else {
          this.$message.error('数据请求失败')
        }
      }).catch(err => {
        this.$message.error('热门歌单接口丢失')
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>