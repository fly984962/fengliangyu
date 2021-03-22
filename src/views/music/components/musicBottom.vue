<template>
  <!--------------------------------- 播放页----------------------------------- -->
  <div>
    <audio controls :src="palyId" autoplay class="xxx"></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../../../api/music/index.js'
export default {
  data() {
    return {
      palyId: '',
      abb: ''
    }
  },
  computed: {
    ...mapState(['musicId'])
  },
  watch: {
    musicId(newPlay,formerPlay) {
      // console.log(newPlay,formerPlay)
      this.musicPlay(newPlay)
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
    }
  }
}
</script>

<style>
.xxx {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
</style>
