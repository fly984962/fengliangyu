<template>
  <div id="mvplay">
    <!-- -----------------------------mv播放-------------------------------- -->
    <video :src="mvId"></video>
  </div>
</template>

<script>
import api from '../../api/music/index.js'
export default {
  data() {
    return {
      mvId: 'http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/4934659566/23a2848008210d4210ddb28cbecaaaea.mp4?wsSecret=d69af2dcfd638834026f4cf03eba8007&wsTime=1616343786'
    }
  },
  mounted() {
    this.musicMvUrlId()
  },
  methods: {
    musicMvUrlId() { // 获取Mv
      api.getMusicMvUrl(this.$route.query.id).then(res => {
        let dataObj = res.data.data.brs
        console.log(dataObj)
        // this.mvId = res.data.data.brs
      })
    }
  },
}
</script>

<style lang="less">
#mvplay {
  width: 70%;
  margin: 0 auto;
  video {
    width: 100%;
  }
}
</style>
