import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicId: null, // 音乐id
    musicName: null, // 音乐名
    musicImg: null, // 音乐图片
    musicSinger: null, // 音乐歌手
    playbasket: true, // 播放mv时底部的播放栏隐藏掉
    topLogin: true, // 导航栏上的登录按钮 如果登录成功后就隐藏掉
    loginframe: false, // 登录框的显示状态, 登陆成功后隐藏
    statusData: [] // 登录成功后存储用户的相关信息
  },
  mutations: {

  },
  actions: {
  },
  modules: {
  }
})
