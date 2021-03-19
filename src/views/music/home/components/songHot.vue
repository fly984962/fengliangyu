<template>
  <div id="songHot">
    <!-- ------------------------------热门歌单----------------------------------- -->
    <div style="height:25px;">{{ null }}</div>
    <div class="songHeight">
      <span>热门歌单</span>
      <div class="songList">
        <span v-for="(item,index) in hotData" :key="index" @click="hotDataFun(item)">
          {{ item.name }}
        </span>
      </div>
      <div>
        123
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotData : {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      active:0
    }
  },
  methods: {
    hotDataFun(item) {
      $emit()
    }
  }
}
</script>

<style lang="less">
#songHot {
  .songHeight {
    height: 30px;
    width: 70%;
    margin: 0 auto;
    > span {
      line-height: 30px;
      font-weight: 700;
    }
    .songList {
      width: 100%;
      height: 30px;
      background: red;
      margin-bottom: 10px;
      > span {
        line-height: 30px;
      }
    }
  }
}
</style>
