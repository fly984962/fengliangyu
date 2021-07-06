<template>
  <div id="singerIntroduce">
    <p style="font-size:24px;margin-bottom:10px;">{{ artistsName }}</p>
    <img :src="singerImg" alt="">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :stretch="true">
      <el-tab-pane label="热门作品" name="first">
        <works :hotSongs="hotSongs" />
      </el-tab-pane>
      <el-tab-pane label="所有专辑" name="second">
        <album :hotAlbums="hotAlbums" :total="total" @ok="ok" />
      </el-tab-pane>
      <el-tab-pane label="相关MV" name="third">
        <mv :mvs="mvs" :total="total2"/>
      </el-tab-pane>
      <el-tab-pane label="艺人介绍" name="fourth">
        <artists v-if="artistsData" :artistsData="artistsData" :artistsName="artistsName" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from '../../api/music/index.js'
import works from './components/works.vue'
import album from './components/album.vue'
import mv from './components/mv.vue'
import artists from './components/artists.vue'
export default {
  components : {
    works,
    album,
    mv,
    artists
  },
  data() {
    return {
      singerImg: '',
      activeName: 'first',
      artistsName: '',
      artistsData: {},
      hotSongs: [],
      hotAlbums: [],
      total: 0,
      offset: 1,
      total2: 0,
      offset2: 1,
      mvs: []
    }
  },
  mounted() {
    api.getMusicArtistA(this.$route.query.id).then(res => {
      if (res.status == 200) {
        this.singerImg = res.data.data.artist.cover + '?param=640y300'
        this.artistsName = res.data.data.artist.name
        // console.log(res)
      } else {
        this.$message.error('歌手信息接口请求失败')
      }
    })
    this.worksRequest()
  },
  methods: {
    ok(val) {
      this.offset = val
      this.albumRequest()
    },
    handleClick(tab, event) {
      switch(tab.name) {
        case 'first' :
          this.worksRequest()
          break
        case 'second' :
          this.albumRequest()
          break
        case 'third' :
          this.mvRequest()
          break
        case 'fourth' :
          this.artistsRequest()
          break
      }
    },
    artistsRequest() { // 艺人介绍
      api.getMusicArtistB(this.$route.query.id).then(res => {
        if (res.status == 200) {
          res.data.introduction.map(item => {
            item.txt = item.txt.split("\n")
          })
          this.artistsData = res.data
        } else {
          this.$message.error('艺人介绍请求失败')
        }
      })
    },
    worksRequest() { // 热门作品
      api.getMusicArtistC(this.$route.query.id).then(res => {
        if (res.status == 200) {
          // console.log('作品', res)
          this.hotSongs = res.data.hotSongs
          for (let i = 0; i < this.hotSongs.length; i++) {
            this.hotSongs[i].index = i + 1
          }
        } else {
          this.$message.error('热门作品请求失败')
        }
      })
    },
    albumRequest() { // 全部专辑
      api.getMusicArtistD(this.$route.query.id, this.offset).then(res => {
        if (res.status == 200) {
          this.hotAlbums = res.data.hotAlbums
          this.hotAlbums.map(item => {
            let it = new Date(item.publishTime)
            item.publishTime = `${it.getFullYear()}-${it.getMonth()+1}-${it.getDate()}`
            this.total = Number(res.data.artist.albumSize)
          })
        } else {
          this.$message.error('所有专辑请求失败')
        }
      })
    },
    mvRequest() {
      api.getMusicArtistE(this.$route.query.id, this.offset2).then(res => {
        console.log('mv', res)
        if (res.status == 200) {
          this.mvs = res.data.mvs
        }
      })
    }
  }
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
