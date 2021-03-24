<template>
  <div id="musicHead">
    <div class="musicHeadBox">
      <el-menu :default-active="activeIndex" class="el-menu-demo menuClass" mode="horizontal">
        <el-menu-item index="1" @click="homeClick">首页</el-menu-item>
        <el-menu-item index="2" @click="rankingClick">排行榜</el-menu-item>
        <el-menu-item index="3" @click="songlistClick">歌单</el-menu-item>
        <el-menu-item index="4" @click="mvClick">MV</el-menu-item>
        <el-menu-item index="5" @click="singerClick">歌手</el-menu-item>
        <el-menu-item index="6" @click="mymusicClick">我的音乐</el-menu-item>
      </el-menu>
      <!-- <el-input size="mini" class="inputClass" /> -->
      <el-input size="mini" class="inputClass" v-model="musicSearch" @input="http">
        <template slot="append">
          <i class="el-icon-search"></i>
        </template>
      </el-input>
      <div class="musicLogin" v-if="topLogin" @click="loginBlock">登录</div>
      <div class="inputSearch" v-if="SearchShow">
        <div v-for="(item,index) in SearchData" :key="index">
          <p style="font-size:16px;margin-left:4px;cursor: pointer;width:70%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color: #dd6b6b;" @click="searchClick(item)">{{ item.name }}</p>
          <p style="font-size:12px;margin-left:10px;cursor: pointer;" @click="searchClick(item)">演唱者:{{ item.artists[0].name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../../../api/music/index.js'
export default {
  data() {
    return {
      activeIndex: '1',
      musicSearch:'',
      SearchData: [],
      SearchShow: false
    }
  },
  computed: {
    ...mapState(['topLogin'])
  },
  watch: {
    musicSearch() {
      if (this.musicSearch.length == 0) {
        this.SearchShow = false
      } else {
        this.SearchShow = true
      }
    }
  },
  methods: {
    // mouseclick(val) {
    //   console.log(val);
    // },
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
    http() {
      console.log('搜索执行了')
      if (this.musicSearch) {
        api.getSearch(this.musicSearch).then(res => {
          console.log(res);
          this.SearchData = res.data.result.songs.slice(0,10)
        })
      }
    },
    searchClick(val) {
      console.log('播放执行了', val)
      // this.musicSearch = ''
      this.SearchData = []
      this.SearchShow = false
      this.$store.state.musicId = val.id
    },
    loginBlock() {
      this.$store.state.loginframe = true
    },
  }
}
</script>

<style lang="less">
#musicHead {
  border-bottom: solid 1px #e6e6e6;
  height: 60px;
  .musicHeadBox{
    width: 70%;
    margin: 0 auto;
    position: relative;
    .el-menu.el-menu--horizontal{
      border-bottom:none;
      // float: left;
      width: 90%;
    }
    .menuClass {
      margin: 0 auto;
    }
    > ul {
      // width: 70%;
      margin: 0 auto;
      // background: red;
    }
    .inputClass {
      position: absolute;
      width: 200px;
      // float: right;
      top: 16px;
      right: 160px;
      // color: #dd6b6b
    }
    .inputSearch {
      position: absolute;
      width: 200px;
      height: 200px;
      background: rgb(128, 191, 228);
      top: 45px;
      right: 160px;
      z-index: 999;
      overflow: auto;
    }
    .inputSearch::-webkit-scrollbar {
      width: 8px;
      height: 10px;
    }
    .inputSearch::-webkit-scrollbar-thumb {
      border-radius: 500px;
      background: rgba(90, 238, 53, 0.5);
    }
    .musicLogin { // 登录
      position: absolute;
      width: 50px;
      height: 50px;
      line-height: 50px;
      right: 15px;
      top: 0px;
      bottom: 0px;
      margin: auto;
      cursor: pointer;
    }
    .musicLogin:hover {
      color: rgb(87, 96, 230);
    }
  }
}
</style>
