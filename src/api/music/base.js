const base = {
  musicUrl : '/api', // http://localhost:3000/
  musicUrlB : 'http://musicapi.leanapp.cn',
  musicBanner : '/bannar' , // 轮播
  musicSearch : '/search?keywords=', // 搜索
  musicPlay : '/song/url?id=', // 播放
  musicLyric: '/lyric?id=', // 歌词
  musicHot: '/playlist/hot', // 热门歌单
  musicCat: '/top/playlist?limit=5&order=hot&cat=', // 获取热门歌单
  musicDetail: '/playlist/detail?limit=10&id=', // 获取歌单详情
  musicNewPlate: '/top/album?limit=9&area=', // 新碟上架
  musicToplist: `/toplist`, // 排行榜
  musicMv: '/mv/first?limit=10&area=', // Mv列表
  musicMvUrl: '/mv/detail?mvid=', // 获取Mv
}

export default base