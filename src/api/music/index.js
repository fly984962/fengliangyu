import axios from 'axios'
import base from './base'

const musicApi = {
  getBanner() { // 轮播
    return  axios.get(base.musicUrl + base.musicBanner)
  },
  getHot() { // 热门歌单
    return  axios.get(base.musicUrl + base.musicHot)
  },
  getCat(code) { // 获取热门歌单
    return  axios.get(base.musicUrl + base.musicCat + code)
  },
  getPlate(code) { // 新碟上架
    return  axios.get(base.musicUrl + base.musicNewPlate + code)
  },
  getToplist() { // 排行榜
    return  axios.get(base.musicUrl + base.musicToplist)
  },
  getMusicMv(code) { // Mv列表
    return  axios.get(base.musicUrl + base.musicMv + code)
  },
  getMusicMvUrl(id) { // 获取Mv
    return  axios.get('http://musicapi.leanapp.cn' + base.musicMvUrl + id)
  },
  getmusicMvInfo(id) { // 获取Mv对应的点赞和评论
    return  axios.get(base.musicUrl + base.musicMvInfo + id)
  },
  getmusicArtists() { // 获取热门歌手
    return  axios.get(base.musicUrl + base.musicArtists)
  },
  getmusicLogin(codeA,codeB) { // 登录
    return  axios.get(base.musicUrl + base.loginA + codeA + base.loginB + codeB)
  },
  getDetail(id) { // 排行榜
    return  axios.get(base.musicUrl + base.musicDetail + id)
  },
  getPlay(id) { // 网易云歌曲播放
    return  axios.get(base.musicUrl + base.musicPlay + id)
  },
  getSearch(code) { // 网易云歌曲搜索
    return  axios.get(base.musicUrl + base.musicSearch + code)
  },
  getLyric(id) { // 网易云歌曲歌词
    return  axios.get(base.musicUrl + base.musicLyric + id)
  }
}

export default musicApi