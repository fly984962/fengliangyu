const base = {
  musicUrl : '/api', // http://localhost:3000/
  // musicUrl : 'http://localhost:3000', // http://localhost:3000/
  musicUrlB : 'http://musicapi.leanapp.cn',
  musicBanner : '/banner?type=0' , // 轮播
  musicSearch : '/search?keywords=', // 搜索
  musicPlay : '/song/url?id=', // 播放
  musicParticulars : '/song/detail?ids=', // 歌曲详情
  musicLyric: '/lyric?id=', // 歌词
  musicHot: '/playlist/hot', // 热门歌单
  musicCat: '/top/playlist?limit=5&order=hot&cat=', // 获取热门歌单
  musicDetail: '/playlist/detail?limit=10&id=', // 获取歌单详情
  musicNewPlate: '/top/album?limit=20&area=', // 新碟上架
  musicToplist: `/toplist`, // 排行榜
  musicMv: '/mv/first?limit=10&area=', // Mv列表
  musicMvUrl: '/mv/detail?mvid=', // 获取Mv
  musicMvInfo: '/comment/mv?id=', // 获取Mv对应的点赞和评论
  musicArtists: '/top/artists?limit=20', // 热门歌手
  loginA: '/login/cellphone?phone=', // 登录A
  loginB: '&password=', // 登录B
  playlistDetail: '/playlist/detail?id=', // 获取歌单详情
  musicSong: '/song/url?id=', // 获取歌单详情URL
  musicDynamic: '/playlist/detail/dynamic?id=', // 歌单详情动态
  musicComment: '/comment/playlist?limit=10&id=' // 获取歌单评论
}

export default base