import axios from 'axios'
import base from './base'

const musicApi = {
  getBanner() { // 轮播
    return  axios.get('http://localhost:3000' + '/banner')
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