import axios from 'axios'
import base from './base'

const musicApi = {
  getBanner() { // 轮播
    return  axios.get('http://localhost:3000' + '/banner')
  },
  getHot() { // 热门歌单
    return  axios.get(base.musicUrl + base.musicHot)
  },
  // http://localhost:3000/playlist/detail?id=5001
  getCat(code) {
    return  axios.get(base.musicUrl + base.musicCat + code)
  },
  getSearch(code) { // 网易云歌曲搜索
    return  axios.get(base.musicUrl + base.musicSearch + code)
  },
  getPlay(id) { // 网易云歌曲播放
    return  axios.get(base.musicUrl + base.musicPlay + id)
  },
  getLyric(id) { // 网易云歌曲歌词
    return  axios.get(base.musicUrl + base.musicLyric + id)
  }
}

export default musicApi