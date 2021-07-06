import Vue from 'vue'
import Vuex from 'vuex'
import musicdata from './modules/musicdata'
import persistedState from 'vuex-persistedstate'

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
    loginImg: false, // 登录成功之后顶部账号图片显示
    statusData: [] // 登录成功后存储用户的相关信息
  },
  modules: {
    musicdata
  },
  plugins: [
    persistedState({
      storage: window.sessionStorage,
      reducer(val) {
        console.log(val, 'persistedState')
        return {
          playbasket: val.playbasket
        }
      }
    })
  ]
})
