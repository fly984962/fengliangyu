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
    <audio controls :src="palyId" autoplay></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../../../api/music/index.js'
export default {
  data() {
    return {
      palyId: '',
      picUrl: '',
      musicName: '',
      musicSinger: ''
    }
  },
  computed: {
    ...mapState(['musicId'])
  },
  watch: {
    musicId(newPlay,formerPlay) {
      // console.log(newPlay,formerPlay)
      this.musicPlay(newPlay)
      this.musicParticulars(newPlay)
    }
  },
  methods: {
    musicPlay(id) {
      api.getPlay(id).then(res => {
        console.log('播放', res)
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
          this.musicName = res.data.songs[0].al.name
          this.musicSinger = res.data.songs[0].ar[0].name
          console.log('----------------',res.data.songs[0]);
        } else {
          this.$message.error('歌曲详情数据请求失败')
        }
      }).catch(err => {
        this.$message.error('歌曲详情接口丢失')
      })
    }
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
}
</style>
