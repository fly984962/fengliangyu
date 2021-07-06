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
        <el-slider class="musicBottom-center-center_box" v-model="playPlan" :show-tooltip="false" @change="musicNum"></el-slider>
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
        <span :style="{'color': (lyricIf == true ? 'red':'#000')}" style="margin-left:15px;font-size:20px;cursor: pointer;" class="iconfont musicBottom-right_center_icon" @click="lyricClick">&#xe727;
          <div v-if="lyricIf" class="musicBottom-right_center_word">
            <!-- <p style="color:#fff;position: absolute;top:-22px;right:6px;font-size:12px;"><span @click="lyricIf = false">x</span></p> -->
            <!-- <div style="width:20px;height:20px;"></div> -->
            <div class="musicBottom-right_center_word_lyric">
              <div style="transition: transform 0.5s ease-out 0s;" :style="musicBottomSty">
                <p style="color:#fff;width:100%;height:20px;line-height:20px;font-size:12px;" v-for="(item,index) in lyric" :key="index" :style="{'color': (index == currentRow ? 'red':'#fff')}">{{ item.text }}</p>
              </div>
            </div>
          </div>
        </span>
        <span style="margin-left:15px;font-size:16px;cursor: pointer;" class="iconfont volumeClass" @click="volumeClick">
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
      sliderIf: false,
      lyric: [],
      currentTime: '',
      currentRow: '',
      lyricIf: false,
      ti: '0',
      musicBottomSty: {
        width: '300px',
        // height: '280px',
        overflow: 'hidden',
        transform: `translateY(-0px)`
      }
    }
  },
  computed: {
    ...mapState(['musicId'])
  },
  watch: {
    musicId(newPlay,formerPlay) { // 监听歌曲播放的状态 如果有变化 调用最新的ID歌曲播放
      this.musicPlay(newPlay)
      this.musicParticulars(newPlay)
      this.getlyrics(newPlay)
      this.ti = '0'
      this.musicBottomSty.transform = `translateY(-0px)`
    },
    volume(newPlay,formerPlay) { // 监听当前音量
      this.$refs.audio.volume = newPlay / 100
      sessionStorage.setItem("volume", newPlay);
    },
    currentTime(a, b) { // 监听歌词播放到哪一行
      // console.log(a,parseInt(b))
      this.lyric.forEach((element, index) => {
        if (parseInt(b) == element.time) {
          this.currentRow = index; // 通过比较我们歌词属性里的时间与当前播放时间，来定位到该歌词
          if (this.currentRow >= 8) {
            // this.ti = parseInt(this.ti) + parseInt(5) 
            this.ti = this.currentRow * 20 - 140
            this.musicBottomSty.transform = `translateY(-${this.ti}px)`
          } else {
            this.musicBottomSty.transform = `translateY(-0px)`
          }
        }
      });
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
    lyricClick() {
      this.lyricIf = !this.lyricIf
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
    getlyrics(val) {
      api.getLyric(val).then(res => {
        if (res.status == 200) {
          console.log('歌词', res)
          this.formatLyric(res.data.lrc.lyric)
        }
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
    formatLyric(text) {
      this.lyric = []
      let lyricA = []
      let arr = text.split("\n"); // 通过换行符“\n”进行切割
      let row = arr.length; //获取歌词行数
      for (let i = 0; i < row; i++) {
        let temp_row = arr[i]; // 现在每一行格式大概就是这样"[00:04.302][02:10.00]hello world";
        let temp_arr = temp_row.split("]"); // 我们可以通过“]”对时间和文本进行分离
        let text = temp_arr.pop(); // 把歌词文本从数组中剔除出来，获取到歌词文本了！
        //再对剩下的歌词时间进行处理
        temp_arr.forEach((element,index) => {
          let obj = {};
          let time_arr = element.substr(1, element.length - 1).split(":"); // 先把多余的“[”去掉，再分离出分、秒
          let s = parseInt(time_arr[0]) * 60 + Math.ceil(time_arr[1]); // 把时间转换成与currentTime相同的类型，方便待会实现滚动效果
          obj.time = s;
          obj.text = text;
          obj.num = i
          this.lyric.push(obj); // 每一行歌词对象存到组件的lyric歌词属性里
        });
      }
      console.log(this.lyric)
    },
    getDuration() { // 歌曲总时长
      this.second2 = (Math.floor(parseInt(this.$refs.audio.duration) / 60)).toString().padStart(2, '0')
      this.minute2 = (parseInt(this.$refs.audio.duration) % 60).toString().padStart(2, '0')
    },
    updateTime(e) { // 当前播放时间
      this.currentTime = e.target.currentTime;  //获取audio当前播放时间
      // console.log('当前播放时间' ,this.currentTime)
      this.second = (Math.floor(parseInt(e.target.currentTime) / 60)).toString().padStart(2, '0')
      this.minute = (parseInt(e.target.currentTime) % 60).toString().padStart(2, '0')
    },
    musicNum(val) { // 改变播放进度条
      const musicMp3 = document.getElementById('musicMp3')
      musicMp3.currentTime = (this.playPlan/100).toFixed(5) * musicMp3.duration
    },
    changeProgress() { // 歌曲进度条
      const musicMp3 = document.getElementById('musicMp3')
      const timer = setInterval(() => {
        const numbers = musicMp3.currentTime / musicMp3.duration
        // let perNumber = (numbers * 100).toFixed(2)
        let perNumber = (numbers * 100)
        if (perNumber >= 100) {
          clearInterval(timer)
          this.ti = '0'
          this.musicBottomSty.transform = `translateY(-0px)`
        }
        this.playPlan = parseInt(perNumber)
        // console.log('当前', parseInt(perNumber))
      }, 1000)
      // console.log('播放时间', musicMp3.currentTime);
      // console.log('总时间', musicMp3.duration);
      // console.log((this.playPlan/100).toFixed(5) * musicMp3.duration, '当前播放数');
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
      .musicBottom-right_center_icon {
        position: relative;
        .musicBottom-right_center_word {
          width: 300px;
          height: 300px;
          background: #000;
          position: absolute;
          bottom: 40px;
          left: -145px;
          // overflow: hidden;
          .musicBottom-right_center_word_lyric {
            width: 300px;
            height: 300px;
            overflow: hidden;
          }
        }
      }
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
