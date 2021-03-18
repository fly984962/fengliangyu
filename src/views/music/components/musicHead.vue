<template>
  <div id="musicHead">
    <div class="musicHeadBox">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1" @click="homeClick">首页</el-menu-item>
        <el-menu-item index="2" @click="rankingClick">排行榜</el-menu-item>
        <el-menu-item index="3" @click="songlistClick">歌单</el-menu-item>
        <el-menu-item index="4" @click="mvClick">MV</el-menu-item>
        <el-menu-item index="5" @click="singerClick">歌手</el-menu-item>
        <el-menu-item index="6" @click="mymusicClick">我的音乐</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    homeClick() { // 首页
      this.$router.push({ path: '/home'})
    },
    rankingClick() { // 排行榜
      this.$router.push({ path: '/ranking'})
    },
    songlistClick() { // 歌单
      this.$router.push({ path: '/songlist'})
    },
    mvClick() { // mv
      this.$router.push({ path: '/mv'})
    },
    singerClick() { // 歌手
      this.$router.push({ path: '/singer'})
    },
    mymusicClick() { // 我的音乐
      this.$router.push({ path: '/mymusic'})
    },
  }
}
</script>

<style lang="less">
#musicHead {
  border-bottom: solid 1px #e6e6e6;
  .musicHeadBox{
    width: 450px;
    margin: 0 auto;
    .el-menu.el-menu--horizontal{
      border-bottom:none;
    }
    > ul {
      // width: 100%;
      margin: 0 auto;
      // background: red;
    }
  }
}
</style>
