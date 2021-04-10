<template>
  <div id="mvplay">
    <!-- -----------------------------mv播放-------------------------------- -->
    <!-- {{ mvId }} -->
    <div class="mvplayBox">
      <!-- <video :src="mvId" controls autoplay style="cursor: pointer;"></video> -->
      <!-- <video controls autoplay style="cursor: pointer;">
        <source
          type="video/mp4"
          :src="this.mvId"
        >
      </video> -->
      <video-player class="mvplayBoxVideo" ref="videoPlayer" :playsinline="true" :options="playerOptions" />
    </div>
    <!-- <div style="haight:20px;">{{ null }}</div> -->
    <div class="mvplayBody">
      <img class="mvplayBodyImg" src="../../assets/images/1.jpg" alt="">
      <span v-for="(item,index) in artists" :key="index" style="cursor: pointer;">
        {{ item.name }}
      </span>
    </div>
    <div class="songName">
      <p style="cursor: pointer;">{{ mvSongName }}</p>
      <span style="cursor: pointer;">发布：{{ publishTime }}</span><span style="cursor: pointer;">播放：{{ shareCount }}万次</span>
    </div>
    <div class="hotComments">
      <span style="cursor: pointer;">精彩评论</span>
      <div v-for="(item,index) in hotComments" :key="index">
        <div class="hotCommentsImg">
          <img style="cursor: pointer;" :src="item.user.avatarUrl" alt="">
        </div>
        <div class="hotCommentsName">
          <p style="margin-bottom: 8px;color:#5091CA;cursor: pointer;">{{ item.user.nickname }}</p>
          <p style="font-size:12px;cursor: pointer;">{{ item.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/music/index.js'
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
export default {
  data() {
    return {
      // mvId: 'http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/4934659566/23a2848008210d4210ddb28cbecaaaea.mp4?wsSecret=d69af2dcfd638834026f4cf03eba8007&wsTime=1616343786',
      artists: [], // 歌手
      mvId: '',
      mvSongName: '', // 歌名
      publishTime: '', // 发布时间
      shareCount: '', // 播放次数
      comments: [],
      hotComments: [],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src:''  //视频url地址
          },
        ],
        // poster: require("../assets/Index/video01.png"), //你的封面地址
        // width: document.documentElement.clientWidth,
        // notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },

      },
    }
  },
  mounted() {
    this.musicMvUrlId()
  },
  methods: {
    musicMvUrlId() { // 获取Mv
      api.getMusicMvUrl(this.$route.query.id).then(res => {
        if (res.status == 200) {
          let dataObj = res.data.data.brs
          this.mvId = dataObj['720']
          this.playerOptions.sources[0].src = dataObj['720']
          this.artists = res.data.data.artists
          this.mvSongName = res.data.data.name
          this.publishTime = res.data.data.publishTime
          this.shareCount = res.data.data.shareCount
          console.log(res)
        } else {
          this.$message.error('MV数据请求失败')
        }
      }).catch(err => {
        this.$message.error('Mv接口丢失')
      })
      api.getmusicMvInfo(this.$route.query.id).then(res => {
        if (res.status == 200) {
          // console.log(res)
          this.comments = res.data.comments
          this.hotComments = res.data.hotComments
        }
      }).catch(err => {
        this.$message.error('mv评论接口丢失')
      })
    }
  },
}
</script>

<style lang="less">
#mvplay {
  .mvplayBox {
    width: 100%;
    height: 600px;
    background: #333333;
    position: relative;
    margin-bottom: 20px;
    .mvplayBoxVideo {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      margin: auto;
      // margin: 0 auto;
      width: 70%;
      height: 100%;
    }
    // video {
    //   // position: absolute;
    //   // top: 0;
    //   // right: 0;
    //   // left: 0;
    //   // margin: auto;
    //   margin: 0 auto;
    //   width: 70%;
    //   height: 100%;
    // }
  }
  .mvplayBody {
    width: 70%;
    margin: 0 auto;
    height: 50px;
    margin-bottom: 10px;
    .mvplayBodyImg {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      float: left;
    }
    > span {
      line-height: 50px;
      float: left;
      margin-left: 10px;
      font-size: 20px;
      font-weight: 520;
    }
  }
  .songName {
    width: 70%;
    margin: 0 auto;
    margin-bottom: 30px;
    > p {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    > span {
      margin-right: 8px;
      font-size: 12px;
    }
  }
  .hotComments {
    width: 70%;
    margin: 0 auto;
    > span {
      font-weight: 600;
      font-style: 20px;
      display: inline-block;
      color: #e27e7e;
      margin-bottom: 20px;
    }
    > div {
      height: 90px;
      border-bottom: 1px solid #F2F2F2;
      .hotCommentsImg {
      height: 90px;
      line-height: 40px;
      width:7%;
      float: left;
      position: relative;
      > img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
    .hotCommentsName {
      height: 90px;
      width: 88%;
      float: left;
      padding: 20px 0px;
      box-sizing: border-box;
      // background: red;
      > p {
        width: 100%;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
    }
  }
}
</style>
