<template>
  <div id="songHot">
    <div style="height:25px;">{{ null }}</div>
    <div class="songHeight">
      <span>热门歌单</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
#songHot {
  .songHeight {
    // background: red;
    height: 30px;
    width: 70%;
    margin: 0 auto;
    > span {
      line-height: 30px;
      font-weight: 700;
    }
  }
}
</style>
