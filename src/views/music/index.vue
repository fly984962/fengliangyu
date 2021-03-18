<template>
  <div id="music">
    <div class="musicHead">
      <musicHead />
    </div>
    <div class="musicBody">
      <router-view></router-view>
    </div>
    <div class="musicBottom">
      <musicBottom />
    </div>
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
    background: red;
    position: fixed;
    bottom: 0;
    // left: 0;
  }
}
</style>
