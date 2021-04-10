<template>
  <div id="homeBox">
    <!-- ---------------------------------首页----------------------------------- -->
    <!-- 轮播 -->
    <banner :bannerData="bannerData" />
    <div style="height:25px;">{{ null }}</div> <!-- 放一个空DIV,让两个组件之间隔开 -->
    <!-- 热门歌单 -->
    <songHot :hotData="hotData" :hotSongList="hotSongList" :songListSet="songListSet" @songListAcquire="songListAcquire" />
    <!-- 新碟上架 -->
    <div style="height:20px;">{{ null }}</div> <!-- 放一个空DIV,让两个组件之间隔开 --> 
    <newPlate :newPlateTop="newPlateTop" :PlateData="PlateData" :PlateDataList="PlateDataList" @plateDataMet="plateDataMet" />
    <!-- 排行榜 -->
    <rankingList :rankingListTitle="rankingListTitle" :rankingListData="rankingListData" :soaringData="soaringData" :newSongData="newSongData" :originalData="originalData" />
    <!-- MV -->
    <div style="height:20px;">{{ null }}</div> <!-- 放一个空DIV,让两个组件之间隔开 --> 
    <musicMv :musicMvTitle="musicMvTitle" :musicMvData="musicMvData" :musicMvTitleList="musicMvTitleList" @musicMvUrlName="musicMvUrlName" />
    <!-- 热门歌手 -->
    <singerList :singerListData="singerListData" />
  </div>
</template>

<script>
import banner from './components/banner'
import songHot from './components/songHot'
import newPlate from './components/newPlate'
import rankingList from './components/rankingList'
import musicMv from './components/musicMv'
import singerList from './components/singerList'
import api from '../../../api/music/index.js'
// getHot
export default {
  components: {
    banner,
    songHot,
    newPlate,
    rankingList,
    musicMv,
    singerList
  },
  data () {
    return {
      hotSongList: '推荐歌单',
      newPlateTop: '新碟上架',
      rankingListTitle: '排行榜',
      musicMvTitle: '推荐MV',
      bannerData: [], // 轮播
      hotData: [], // 热门歌单类型
      songListSet: [], // 获取热门类型的歌单
      PlateData: [ // 这是造的伪数据,country是遍历在页面可点击的,点击之后使用area请求对应的新碟,因为没看到文档获取这段的接口,所以造一个凑活着用
        { 
          country: '全部',
          area: 'ALL'
        },
        {
          country: '华语',
          area: 'ZH'
        },
        {
          country: '欧美',
          area: 'EA'
        },
        {
          country: '韩国',
          area: 'KR'
        },
        {
          country: '日本',
          area: 'JP'
        }
      ],
      PlateDataList: [], // 新碟上架
      rankingListData: [], // 排行榜
      soaringData: [], // 飙升榜
      newSongData: [], // 新歌榜
      originalData: [], // 原创榜
      musicMvData: [], // 页面展示mv数据
      musicMvTitleList: [ // 推荐MV造的伪数据 点击切换
        {
          area: '内地'
        },
        {
          area: '港台'
        },
        {
          area: '欧美'
        },
        {
          area: '日本'
        },
        {
          area: '韩国'
        }
      ],
      singerListData: [] // 热门歌手
    }
  },
  created() {
    this.bannerList()
    this.hotList()
    // this.plateList()
    this.toplist()
    this.rankingListGather()
    this.mvList()
    this.artistsList()
  },
  methods: {
    bannerList() {
      // 轮播接口
      api.getBanner().then(res => {
        // console.log('轮播', res)
        if (res.status == 200) {
          this.bannerData = res.data.banners
        } else {
          this.$message.error('轮播数据请求失败')
        }
      }).catch(err => {
        this.$message.error('轮播接口丢失')
      })
    },
    hotList() {
      // 热门歌单接口
      api.getHot().then(res => {
        // console.log('热门歌单', res)
        if (res.status == 200) {
          this.hotData = res.data.tags.slice(0,5) // 数据中有10条歌单 有点多了 我们取前5个
          // console.log(res.data.tags[0].id);
          api.getCat(res.data.tags[0].name).then(res => { // 我们进去直接展示上面第一个歌单的相关数据 后面根据点的在获取相关的
            // console.log('获取热门歌单', res)
            if (res.status == 200) { // 获取歌单的数量可以设置多条,我在api配置接口哪里写死了获取5条
              this.songListSet = res.data.playlists
            } else {
              this.$message.error('获取歌单数据请求失败')
            }
          }).catch(err => {
            this.$message.error('获取歌单接口丢失')
          })
        } else {
          this.$message.error('热门歌单数据请求失败')
        }
      }).catch(err => {
        this.$message.error('热门歌单接口丢失')
      })
    },
    plateList() {
      // 新碟上架接口
      api.getPlate('ALL').then(res => {
        if (res.status == 200) {
          console.log(res)
          this.PlateDataList = res.data.monthData.slice(0,9)
        } else {
          this.$message.error('新碟上架数据请求失败')
        }
      }).catch(err => {
        this.$message.error('新碟上架接口丢失')
      })
    },
    toplist() {
      // 排行榜接口
      api.getToplist().then(res => {
        if (res.status == 200) {
          // console.log('排行榜', res.data.list.slice(0,3))
          this.rankingListData = res.data.list.slice(0,3)
        } else {
          this.$message.error('排行榜数据请求失败')
        }
      }).catch(err => {
        this.$message.error('排行榜接口丢失')
      })
    },
    rankingListGather() {
      // 获取对应排行榜的数据
      api.getDetail('19723756').then(res => {
        if (res.status == 200) {
          // console.log('飙升榜', res)
          this.soaringData = res.data.playlist.tracks.slice(0,10)
        } else {
          this.$message.error('飙升榜数据请求失败')
        }
      }).catch(err => {
        this.$message.error('飙升榜接口丢失')
      })
      api.getDetail('3779629').then(res => {
        if (res.status == 200) {
          this.newSongData = res.data.playlist.tracks.slice(0,10)
          // console.log('新歌榜',this.newSongData)
        } else {
          this.$message.error('新歌榜数据请求失败')
        }
        // console.log(res)
      }).catch(err => {
        this.$message.error('新歌榜接口丢失')
      })
      api.getDetail('2884035').then(res => {
        if (res.status == 200) {
          // console.log('原创榜', res)
          this.originalData = res.data.playlist.tracks.slice(0,10)
        } else {
          this.$message.error('原创榜数据请求失败')
        }
        // console.log(res)
      }).catch(err => {
        this.$message.error('原创榜接口丢失')
      })
    },
    mvList() {
      // 进入首页获取推荐MV
      api.getMusicMv('内地').then(res => {
        // console.log('mv', res)
        if (res.status == 200) {
          this.musicMvData = res.data.data
        } else {
          this.$message.error('推荐MV数据请求失败')
        }
      }).catch(err => {
        this.$message.error('推荐MV接口丢失')
      })
    },
    artistsList() {
      // 进入首页获取热门歌手
      api.getmusicArtists().then(res => {
        console.log('热门歌手', res)
        this.singerListData = res.data.artists
      })
    },
    songListAcquire(val) { // 切换热门歌单时执行
      api.getCat(val.name).then(res => {
        if (res.status == 200) {
          // console.log(res.data.playlists)
          this.songListSet = res.data.playlists.slice(0,10)
        } else {
          this.$message.error('热门歌单数据请求失败')
        }
      }).catch(err => {
        this.$message.error('获取歌单接口丢失')
      })
    },
    plateDataMet(val) { // 切换新碟上架时执行
      api.getPlate(val).then(res => {
        if (res.status == 200) {
          // console.log(res)
          // 这里得吐槽一下,根据文档的limit来请求条数,都写死9条了,请求时还是请求到好几百条,搞得加载时特别慢
          // 也可能是没搞懂条件,将就着用了
          this.PlateDataList = res.data.monthData.slice(0,9)
        } else {
          this.$message.error('新碟上架数据请求失败')
        }
      }).catch(err => {
        this.$message.error('新碟上架接口丢失')
      })
    },
    musicMvUrlName(val) {
      // 获取子级传递的搜索内容参数进行请求
      api.getMusicMv(val).then(res => {
        // console.log('子级mv', res)
        if (res.status == 200) {
          this.musicMvData = res.data.data
        } else {
          this.$message.error('推荐MV数据请求失败')
        }
      }).catch(err => {
        this.$message.error('推荐MV接口丢失')
      })
    }
  }
}
</script>

<style lang="less" scoped>
// #homeBox {
//   background: linear-gradient(limegreen, transparent), linear-gradient(90deg, skyblue, transparent), linear-gradient(-90deg, coral, transparent), linear-gradient(-90deg, rgb(220, 80, 255), transparent), linear-gradient(-90deg, rgb(167, 31, 49), transparent);
//   background-blend-mode: screen;
//   animation: colorfulStripeChange 2.5s infinite alternate linear;
// }
// @keyframes colorfulStripeChange {
//   100% {
//     // -webkit-filter: hue-rotate(360deg);
//     filter: hue-rotate(360deg);
//   }
// }
</style>