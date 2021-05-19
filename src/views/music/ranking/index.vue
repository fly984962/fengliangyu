<template>
  <div id="ranking">
    <div class="ranking_left">
      <p style="font-size:14px;margin:15px 0px 15px 15px;font-weight: 600;">云音乐特色榜</p>
      <div v-for="(item,index) in featuresData" :key="index" :style="{'background': (index == active ? '#E6E6E6':'#fff')}" @click="featuresDataClick(item,index)">
        <img :src="item.coverImgUrl" alt="">
        <div>
          <p>{{ item.name }}</p>
          <p>{{ item.updateFrequency }}</p>
        </div>
      </div>
    </div>
    <div class="ranking_right">
      <div class="ranking_right_top">
        <img :src="playList.coverImgUrl" :alt="playList.name">
        <div class="ranking_right_top_div">
          <p style="margin:20px 0px 0px 20px;font-size: 20px;font-weight: normal;">{{ playList.name }}</p>
          <p style="margin:20px 0px 0px 20px;color: #333;">
            <i class="el-icon-time"></i>
            <span style="font-size: 12px;margin-left: 5px;color: #666;">最近更新：{{playList.updateTime}}</span>
            <span></span>
          </p>
        </div>
      </div>
      <div class="ranking_right_buttom">
        <p style="margin-bottom:8px;line-height: 20px;">
          <span style="color:#333;font-size:20px;">歌曲列表</span>
          <span style="color:#666;font-size:12px;margin-left:10px;">{{tracksLength}}首歌</span>
          <span style="float:right;font-size:12px;">播放：<span style="color:#c20c0c;">{{playList.playCount}}</span>次</span>
        </p>
        <el-table
          :data="tracks"
          stripe
          style="width: 100%;margin-bottom:40px;">
          <el-table-column
            prop="date"
            label=""
            show-overflow-tooltip
            align="center"
            width="50">
            <template slot-scope="scope">
              <span v-if="scope.row.id == musicId ? false : true" style="font-size:12px">{{ scope.row.index }}</span>
              <img v-if="scope.row.id == musicId ? true : false" style="width:20px;height:20px;" src="../../../assets/images/11111111111.gif" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="歌曲标题"
            show-overflow-tooltip
            align="left">
            <template slot-scope="scope">
              <img v-if="scope.row.index == 1 || scope.row.index == 2 || scope.row.index == 3" style="width:50px;height:50px;float:left;" :src="scope.row.al.picUrl" alt="">
              <p class="xxx" style="font-size:12px;cursor:pointer;color:red;float:left;" @click="nameClick(scope.row)">{{ scope.row.name }}</p>
              <span v-if="scope.row.index !== 1">
                <span v-if="scope.row.index !== 2">
                  <span v-if="scope.row.index !== 3">
                    <span v-if="scope.row.mv !== 0" style="margin-left:5px;cursor:pointer;" class="el-icon-video-camera"></span>
                  </span>
                </span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            align="center"
            width="120"
            label="发布时间">
            <template slot-scope="scope">
              <span style="font-size:12px;cursor:pointer;" v-if="scope.row.publishTime !== '1970年1月1日'">{{ scope.row.publishTime }}</span>
              <span style="font-size:12px;cursor:pointer;" v-else-if="scope.row.publishTime == '1970年1月1日'">时间缺失</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            width="120"
            align="center"
            label="歌手">
            <template slot-scope="scope">
              <span style="cursor:pointer;font-size:12px;">{{ scope.row.ar[0].name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="width:10px;height:60px;"></div>
    </div>
  </div>
</template>

<script>
import api from '../../../api/music/index.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      featuresData: [],
      active: 0,
      featuresId: '19723756',
      playList: [],
      tracks: [],
      tracksLength: ''
    }
  },
  mounted() {
    api.getToplist().then(res => {
      if (res.status == 200) {
        let arr = res.data.list.slice(0,4)
        arr.map(item => {
          let i = {name: item.name,id: item.id,coverImgUrl: item.coverImgUrl,updateFrequency: item.updateFrequency}
          this.featuresData.push(i)
        })
      }
    })
    api.getDetailB(this.featuresId).then(res => {
      if (res.status == 200) {
        let Time = new Date(res.data.playlist.updateTime)
        res.data.playlist.updateTime = `${Time.getMonth() + 1}月${Time.getDate()}日`
        this.playList = res.data.playlist
        this.tracks = res.data.playlist.tracks
        for (let i = 0; i < this.tracks.length; i++) {
          this.tracks[i].index = i + 1
          let j = new Date(this.tracks[i].publishTime)
          this.tracks[i].publishTime = `${j.getFullYear()}年${j.getMonth() + 1}月${j.getDate()}日`
        }
        this.tracksLength = res.data.playlist.tracks.length
      }
    })
  },
  computed: {
    ...mapState(['musicId'])
  },
  methods: {
    featuresDataClick(item,index) {
      if (this.featuresId != item.id) {
        this.active = index
        this.featuresId = item.id
        this.featuresList()
      } else {
        this.$message({
          message: '请勿多次点击',
          type: 'warning'
        });
      }
    },
    nameClick(row) {
      console.log(row)
      this.$store.state.musicId = row.id
    },
    featuresList() {
      api.getDetailB(this.featuresId).then(res => {
        if (res.status == 200) {
          let Time = new Date(res.data.playlist.updateTime)
          res.data.playlist.updateTime = `${Time.getMonth() + 1}月${Time.getDate()}日`
          this.playList = res.data.playlist
          this.tracks = res.data.playlist.tracks
          for (let i = 0; i < this.tracks.length; i++) {
            this.tracks[i].index = i + 1
            let j = new Date(this.tracks[i].publishTime)
            this.tracks[i].publishTime = `${j.getFullYear()}年${j.getMonth() + 1}月${j.getDate()}日`
          }
          this.tracksLength = res.data.playlist.tracks.length
        }
      })
    }
  }
}
</script>

<style lang="less">
#ranking {
  width: 1080px;
  // height:100vh;
  // padding-bottom: 60px;
  // background: rgb(199, 199, 117);
  margin: 0 auto;
  .xxx:nth-child(2n) {
    line-height: 50px;
    margin-left: 8px;
  }
  .el-table__header {
    border-top: 2px solid #c20c0c;
  }
  .ranking_left {
    width: 20%;
    // height: 500px;
    float: left;
    border-left: 1px solid #333;
    border-bottom: 1px solid #333;
    box-sizing: border-box;
    // border-right: 1px solid #333;
    // background: red;
    > div {
      width: 100%;
      height: 50px;
      margin-bottom: 10px;
      div {
        margin-left: 10px;
        margin-top: 4px;
        float: left;
        font-size: 12px;
        p:nth-child(1) {
          margin-bottom: 5px;
          color: #333;
        }
        p:nth-child(2) {
          color: #999;
        }
      }
    }
    img {
      width: 50px;
      height: 50px;
      margin-left: 15px;
      float: left;
    }
  }
  .ranking_right {
    width: 80%;
    // height: 500px;
    float: left;
    border-right: 1px solid #333;
    border-left: 1px solid #333;
    box-sizing: border-box;
    // background: blue;
    .ranking_right_top {
      width: 100%;
      height: 240px;
      padding: 40px;
      box-sizing: border-box;
      // background: red;
      img {
        width: 150px;
        height: 150px;
        float: left;
      }
      .ranking_right_top_div {
        width: 600px;
        height: 150px;
        // background: yellow;
        float: left;
      }
    }
    .ranking_right_buttom {
      padding: 0px 40px;
      box-sizing: border-box;
    }
  }
}
</style>
