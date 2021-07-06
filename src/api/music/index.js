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
    return  axios.get(base.musicUrl + base.musicMvUrl + id)
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
  getDetailB(id) { // 排行榜
    return  axios.get(base.musicUrl + base.musicDetailB + id)
  },
  getPlay(id) { // 网易云歌曲播放
    return  axios.get(base.musicUrl + base.musicPlay + id)
  },
  getParticulars(id) { // 网易云歌曲详情
    return  axios.get(base.musicUrl + base.musicParticulars + id)
  },
  getmusicSong(id) { // 网易云歌曲详情
    return  axios.get(base.musicUrl + base.musicSong + id)
  },
  getplaylistDetail(id) { // 歌单详情
    return  axios.get(base.musicUrl + base.playlistDetail + id)
  },
  getMusicComment(id,offset) { // 歌单评论
    return  axios.get(base.musicUrl + base.musicComment + id + '&offset=' + offset)
  },
  getMusicDynamic(id) { // 歌单详情动态
    return  axios.get(base.musicUrl + base.musicDynamic + id)
  },
  getMusicAlbum(id) { // 专辑详情
    return  axios.get(base.musicUrl + base.musicAlbum + id)
  },
  getMusicAlbumComment(id, offset) { // 专辑详情
    return  axios.get(base.musicUrl + base.musicAlbumComment + id + '&offset=' + offset)
  },
  getSearch(code) { // 网易云歌曲搜索
    return  axios.get(base.musicUrl + base.musicSearch + code)
  },
  getLyric(id) { // 网易云歌曲歌词
    return  axios.get(base.musicUrl + base.musicLyric + id)
  },
  getMusicArtistA(id) { // 歌手详情
    return  axios.get(base.musicUrl + base.musicArtistA + id)
  },
  getMusicArtistB(id) { // 歌手描述
    return  axios.get(base.musicUrl + base.musicArtistB + id)
  },
  getMusicArtistC(id) { // 歌手单曲
    return  axios.get(base.musicUrl + base.musicArtistC + id)
  },
  getMusicArtistD(id, offset) { // 歌手专辑
    return  axios.get(base.musicUrl + base.musicArtistD + id + '&offset=' + offset)
  },
  getMusicArtistE(id, offset) { // 歌手专辑
    return  axios.get(base.musicUrl + base.musicArtistE + id + '&offset=' + offset)
  }
}

export default musicApi