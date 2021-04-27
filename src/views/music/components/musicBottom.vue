<template>
  <!--------------------------------- 播放页----------------------------------- -->
  <div id="musicBottom">
    <div class="musicBottom-left">
      <div class="musicBottom-left_left">
        <img v-if="picUrl" class="musicBottom-left_left-img" :src="picUrl" alt="">
      </div>
      <div class="musicBottom-left_right">
        <p class="musicBottom-left_right_p1">{{ musicName }}</p>
        <p class="musicBottom-left_right_p2">{{ musicSinger }}</p>
      </div>
    </div>
    <div class="musicBottom-center">
      <div class="musicBottom-center-left">
        <span class="el-icon-caret-left musicBottom-center-left-button" @click="musicLeft"></span>
        <span v-if="muicePlay" class="el-icon-video-play musicBottom-center-left-button" @click="musicClick"></span>
        <span v-if="musicPause" class="el-icon-video-pause musicBottom-center-left-button" @click="musicClick"></span>
        <span class="el-icon-caret-right musicBottom-center-left-button" @click="musicRight"></span>
      </div>
      <div class="musicBottom-center-center">
        <el-slider class="musicBottom-center-center_box" v-model="playPlan" :show-tooltip="false"></el-slider>
      </div>
    </div>
    <div class="musicBottom-right">
      <div class="musicBottom-right_left">
        <span>{{ second }}:</span>
        <span>{{ minute }}</span>
        <span style="margin: 0px 2px;">-</span>
        <span>{{ second2 }}:</span>
        <span>{{ minute2 }}</span>
      </div>
      <div class="musicBottom-right_center">
        <span :style="{'color': (loop == true ? 'red':'#000')}" style="margin-left:5px;font-size:20px;cursor: pointer;" class="iconfont" @click="loopClick">&#xe607;</span>
        <span style="margin-left:15px;font-size:20px;cursor: pointer;" class="iconfont">&#xe727;</span>
        <span style="margin-left:15px;font-size:20px;cursor: pointer;" class="iconfont volumeClass" @click="volumeClick">
          &#xe642;
          <div v-if="sliderIf">
            <el-slider
              v-model="volume"
              vertical
              height="200px"
              change="sliderChange">
            </el-slider>
          </div>
        </span>
        <span style="margin-left:15px;font-size:20px;cursor: pointer;" class="iconfont">&#xe6af;</span>
      </div>
    </div>
    <audio ref="audio" :loop="loop" style="display: none;" id="musicMp3" controls :src="palyId" @pause="getPause" @canplay="getDuration" @timeupdate="updateTime" @play="getPlay" autoplay></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../../../api/music/index.js'
export default {
  data() {
    return {
      palyId: '', // 歌曲ID
      picUrl: '', // 歌曲url
      musicName: '', // 歌名
      musicSinger: '', // 歌手
      muicePlay: true, // 音乐播放
      musicPause: false, // 音乐暂停
      playPlan: 0, // 歌曲播放进度
      minute: '00', // 歌曲播放分数
      second: '00', // 歌曲播放秒数
      minute2: '00', // 歌曲总分数
      second2: '00', // 歌曲总秒数
      loop: false, // 单曲循环
      volume: 0, // 当前音量值
      sliderIf: false
    }
  },
  computed: {
    ...mapState(['musicId'])
  },
  watch: {
    musicId(newPlay,formerPlay) { // 监听歌曲播放的状态 如果有变化 调用最新的ID歌曲播放
      this.musicPlay(newPlay)
      this.musicParticulars(newPlay)
    },
    volume(newPlay,formerPlay) {
      this.$refs.audio.volume = newPlay / 100
      sessionStorage.setItem("volume", newPlay);
    }
  },
  created() {},
  mounted() {
    if (sessionStorage.getItem("volume")) {
      // console.log(sessionStorage.getItem("volume"), '==========================')
      this.volume = Number(sessionStorage.getItem("volume"))
      // this.$refs.audio.volume = sessionStorage.getItem("volume") / 100
    } else {
      this.volume = this.$refs.audio.volume * 100
    }
  },
  methods: {
    volumeClick() { // 音量调节
      if (this.sliderIf == false) {
        this.sliderIf = true
        setTimeout(() => {
          this.sliderIf = false
        }, 5000)
      }
    },
    loopClick() { // 单曲循环
      this.loop = !this.loop
    },
    musicPlay(id) {
      api.getPlay(id).then(res => {
        // console.log('播放', res)
        if (res.status == 200) {
          this.palyId = res.data.data[0].url
        } else {
          this.$message.error('播放数据请求失败')
        }
      }).catch(err => {
        this.$message.error('播放接口丢失')
      })
    },
    musicParticulars(id) {
      api.getParticulars(id).then(res => {
        if (res.status == 200) {
          // console.log('歌曲详情-------------', res)
          this.picUrl = res.data.songs[0].al.picUrl
          this.musicName = res.data.songs[0].name
          this.musicSinger = res.data.songs[0].ar[0].name
          // console.log('----------------',res.data.songs[0]);
        } else {
          this.$message.error('歌曲详情数据请求失败')
        }
      }).catch(err => {
        this.$message.error('歌曲详情接口丢失')
      })
    },
    getPlay(val) {
      // console.log('播放了', val)
      this.musicPause = true
      this.muicePlay = false
      this.changeProgress()
    },
    getPause(val) {
      // console.log('暂停了', val)
      this.muicePlay = true
      this.musicPause = false
    },
    musicClick() {
      const musicMp3 = document.getElementById('musicMp3')
      // console.log(musicMp3.paused);
      if(this.palyId !== ''){
        if(musicMp3.paused) {
          console.log('我走了播放')
          musicMp3.play()
          this.musicPause = true
          this.muicePlay = false
        } else if(musicMp3.play) {
          console.log('我走了暂停')
          musicMp3.pause()
          this.muicePlay = true
          this.musicPause = false
        }
      } else {
        this.$message.warning('请先选择要播放的歌曲')
      }
    },
    musicLeft() {
      this.$message.warning('切换歌曲暂未开发')
    },
    musicRight() {
      this.$message.warning('切换歌曲暂未开发')
    },
    getDuration() { // 歌曲总时长
      this.second2 = (Math.floor(parseInt(this.$refs.audio.duration) / 60)).toString().padStart(2, '0')
      this.minute2 = (parseInt(this.$refs.audio.duration) % 60).toString().padStart(2, '0')
    },
    updateTime(e) { // 当前播放时间
      this.currentTime = e.target.currentTime;  //获取audio当前播放时间
      this.second = (Math.floor(parseInt(e.target.currentTime) / 60)).toString().padStart(2, '0')
      this.minute = (parseInt(e.target.currentTime) % 60).toString().padStart(2, '0')
    },
    changeProgress() { // 歌曲进度条
      const musicMp3 = document.getElementById('musicMp3')
      const timer = setInterval(() => {
        const numbers = musicMp3.currentTime / musicMp3.duration
        let perNumber = (numbers * 100).toFixed(2)
        if (perNumber >= 100) {
          clearInterval(timer)
        }
        this.playPlan = parseInt(perNumber)
        // console.log('当前', parseInt(perNumber))
      }, 1000)
    },
  }
}
</script>

<style lang="less">
#musicBottom {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: rgb(226, 219, 219);
  .musicBottom-left {
    width: 300px;
    height: 100%;
    float: left;
    // background: blue;
    .musicBottom-left_left {
      width: 50%;
      height: 100%;
      float: left;
      // background: gold;
      .musicBottom-left_left-img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        margin-right: 4px;
        float: right;
      }
    }
    .musicBottom-left_right {
      width: 50%;
      height: 100%;
      float: left;
      // background: green;
      .musicBottom-left_right_p1 {
        width: 140px;
        font-size: 16px;
        margin-top: 8px;
        margin-bottom: 5px;
        cursor: pointer;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .musicBottom-left_right_p2 {
        width: 140px;
        font-size: 12px;
        cursor: pointer;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
  }
  .musicBottom-center {
    width: 53%;
    height: 100%;
    // background: red;
    float: left;
    .musicBottom-center-left {
      width: 20%;
      height: 100%;
      // background: hotpink;
      float: left;
      .musicBottom-center-left-button {
        font-size: 30px;
        line-height: 60px;
        margin-right: 8px;
        cursor: pointer;
        // display: inline-block;
      }
    }
    .musicBottom-center-center {
      width: 80%;
      height: 100%;
      float: left;
      // background: yellow;
      .el-slider {
        margin-top: 11px;
      }
      .el-slider__button {
        width: 12px;
        height: 12px;
        background: rgb(88, 87, 87);
        border: none;
      }
      .el-slider__runway {
        height: 3px;
        background: rgb(172, 171, 171);
      }
      .el-slider__bar {
        background:  rgb(88, 87, 87);
        height: 3px;
      }
    }
  }
  .musicBottom-right {
    width: 300px;
    float: left;
    height: 100%;
    // background: red;
    .musicBottom-right_left {
      width: 40%;
      height: 100%;
      float: left;
      // background: yellow;
      margin-left: 15px;
      line-height: 57px;
    }
    .musicBottom-right_center {
      float: left;
      width: 50%;
      height: 100%;
      line-height: 57px;
      // background: red;
      .volumeClass {
        display: inline-block;
        position: relative;
        > div {
          // height: 100px;
          // background: red;
          position: absolute;
          bottom: 70px;
          left: -11px;
        }
      }
    }
  }
}
</style>
