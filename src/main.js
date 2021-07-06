import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Videojs from 'video.js'
import VuevideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css'
import './assets/css/common.css'
import './assets/css/font_eum80mletqr/iconfont.css'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.use(VuevideoPlayer)
Vue.prototype.$video = Videojs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
