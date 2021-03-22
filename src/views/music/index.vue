<template>
  <div id="music">
    <div class="musicHead">
      <musicHead />
    </div>
    <div class="musicBody">
      <router-view></router-view>
    </div>
    <!-- <div style="width:100%;height:60px;">{{ null }}</div>
    <div class="musicBottom">
      <musicBottom />
    </div> -->
  </div>
</template>

<script>
import musicHead from './components/musicHead.vue'
import musicBottom from './components/musicBottom.vue'
export default {
  components: {
    musicHead,
    musicBottom
  }
}
</script>

<style lang="less">
#music {
  // position: relative;
  .musicBottom {
    width: 100%;
    height: 60px;
    background: #FFFFFF;
    position: fixed;
    bottom: 0;
    z-index: 999;
    // left: 0;
  }
  // .musicBody {
  //   height: 1000px;
  //   overflow: auto;
  // }
}
</style>
