<template>
  <div id="singerIntroduce">
    <img :src="singerImg" alt="">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :stretch="true">
      <el-tab-pane label="热门作品" name="first">热门作品</el-tab-pane>
      <el-tab-pane label="所有专辑" name="second">所有专辑</el-tab-pane>
      <el-tab-pane label="相关MV" name="third">相关MV</el-tab-pane>
      <el-tab-pane label="艺人介绍" name="fourth">艺人介绍</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from '../../api/music/index.js'
export default {
  data() {
    return {
      singerImg: '',
      activeName: 'first'
    }
  },
  mounted() {
    api.getMusicArtistA(this.$route.query.id).then(res => {
      console.log(res, '歌手详情')
      this.singerImg = res.data.data.artist.cover + '?param=640y300'
    })
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
}
</script>

<style lang="less">
#singerIntroduce {
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  border-left: 1px solid #999;
  border-right: 1px solid #999;
  width: 70%;
  margin: 0 auto;
  margin-bottom: 60px;
  img {
    width: 100%;
    height: 300px;
  }
}
</style>
