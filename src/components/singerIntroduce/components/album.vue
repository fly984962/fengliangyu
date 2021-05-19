<template>
  <div id="album">
    <div class="album_top">
      <div class="album_top_body" v-for="(item,index) in hotAlbums" :key="index">
        <div>
          <img :src="item.blurPicUrl" alt="" @click="albumId(item.id)">
        </div>
        <p style="color:#333;font-size:14px;">{{ item.name }}</p>
        <p style="color:#666;font-size:12px;">{{ item.publishTime }}</p>
      </div>
    </div>
    <br>
    <div class="album_buttom">
      <el-pagination
        background
        class="album_pagination"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotAlbums : {
      type: Array,
      default: null
    },
    total: {
      type: Number,
      default: null
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('ok', val)
    },
    albumId(id) {
      this.$router.push({ path: '/musicTheAlbum', query:{ id: id }})
    }
  }
}
</script>

<style lang="less">
#album {
  width: 100%;
  // height: 1000px;
  // background: rgb(161, 161, 161);
  .album_top {
    width: 800px;
    margin: 0 auto;
    .album_top_body {
      width: 170px;
      height: 220px;
      float: left;
      margin-right: 40px;
      margin-bottom: 20px;
      > div {
        width: 170px;
        height: 170px;
        overflow: hidden;
        img {
          width: 170px;
          height: 170px;
          cursor: pointer;
          transition:all .4s;
        }
        > img:hover {
          transform:scale(1.1);
        }
      }
    }
    .album_top_body:nth-child(4n) {
      margin-right: 0px;
    }
  }
  .album_buttom {
    width: 100%;
    float: left;
    .album_pagination {
      text-align: center;
    }
  }
}
</style>
