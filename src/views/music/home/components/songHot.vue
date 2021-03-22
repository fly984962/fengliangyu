<template>
  <div id="songHot">
    <!-- ------------------------------热门歌单----------------------------------- -->
    <div class="songHeight">
      <span>{{ hotSongList }}</span>
      <div class="songList">
        <span v-for="(item,index) in hotData" :key="index" :style="{'color': (index == active ? 'red':'#000')}" @click="hotDataFun(item,index)">
          {{ item.name }}
        </span>
      </div>
      <div class="obtainSongList">
          <img v-for="(item,index) in songListSet" :key="index" :src="item.coverImgUrl">
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
    },
    songListSet : {
      type: Array,
      default: null
    },
    hotSongList : {
      type: String,
      default: null
    },
  },
  data() {
    return {
      active:0
    }
  },
  methods: {
    hotDataFun(item,index) {
      this.active = index
      this.$emit('songListAcquire', item)
    }
  }
}
</script>

<style lang="less">
#songHot {
  text-align: center;
  .songHeight {
    // height: 30px;
    width: 70%;
    margin: 0 auto;
    > span {
      line-height: 30px;
      font-weight: 700;
      font-size: 20px;
    }
    .songList {
      width: 100%;
      height: 30px;
      // background: red;
      margin-bottom: 10px;
      > span {
        line-height: 30px;
        font-weight: 550;
        cursor: pointer;
        margin: 0px 15px;
      }
    }
    .obtainSongList {
      width: 100%;
      height: 200px;
      // overflow: hidden;
      > img {
        width: 18%;
        height: 200px;
        margin-right: 2.5%;
        cursor: pointer;
        transition:all .4s;
      }
      > img:nth-child(5) {
        margin-right: 0%;
      }
      > img:hover {
        transform:scale(1.1);
      }
    }
  }
}
</style>
