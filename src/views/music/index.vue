<template>
  <div id="music">
    <div class="musicPc">
      <div class="musicHead">
        <musicHead />
      </div>
      <div class="musicBody">
        <router-view></router-view>
      </div>
      <div style="width:100%;height:60px;" v-if="playbasket">{{ null }}</div>
      <div class="musicBottom" v-if="playbasket">
        <musicBottom />
      </div>
      <div class="loginClass" v-if="loginframe">
        <musicLogin />
      </div>
    </div>
    <div class="musicMove">
      <musicMove />
    </div>
  </div>
</template>

<script>
import musicHead from './components/musicHead.vue'
import musicBottom from './components/musicBottom.vue'
import musicLogin from './components/musicLogin.vue'
import musicMove from './components/musicMove.vue'
import { mapState } from 'vuex';
export default {
  components: {
    musicHead,
    musicBottom,
    musicLogin,
    musicMove
  },
  computed: {
    ...mapState(['playbasket','loginframe'])
  },
  watch:{
    $route(to,from){
      if (to.path == '/mvplay') { // 监听路由的去向 如果是去单个mv的播放页 就把音乐的播放栏隐藏掉
        this.$store.state.playbasket = false
      } else {
        this.$store.state.playbasket = true
      }
    }
  },
}
</script>
<style scoped>
@media screen and (min-width:992px) {
  .musicPc{
    display: block;
  }
  .musicMove{
    display: none;
  }
}
@media screen and (max-width:991px) {
  .musicMove{
    display: block;
  }
  .musicPc{
    display: none;
  }
}
</style>

<style lang="less">
#music {
  position: relative;
  .musicBottom {
    width: 100%;
    height: 60px;
    // background: #FFFFFF;
    position: fixed;
    bottom: 0;
    z-index: 999;
    // left: 0;
  }
  .loginClass {
    width: 300px;
    height: 300px;
    position: fixed;
    top: 100px;
    left: 0px;
    right: 0px;
    margin: auto;
    z-index: 999;
    background: rgb(132, 210, 247);
    // padding: 0px 0px 20px 20px;
    // box-sizing: border-box;
  }
}
</style>
