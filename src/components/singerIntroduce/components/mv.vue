<template>
  <div id="albumMv">
    <div class="albumMv_top">
      <div v-for="(item,index) in mvs" :key="index" class="albumMv_top_body">
        <img :src="item.imgurl" alt="">
        <i class="el-icon-video-play albumMv_top_body_icon"></i>
        <p style="color:#333;font-size:14px;">{{ item.name }}</p>
        <p style="color:#666;font-size:12px;">{{ item.publishTime }}</p>
      </div>
    </div>
    <div class="albumMv_buttom">
      <p style="font-size:12px;text-align:center;margin-top:20px;color:red;">没找到总条数数据，暂时无法分页</p>
      <!-- <el-pagination
        background
        class="albumMv_pagination"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mvs : {
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

    }
  },
}
</script>

<style lang="less">
#albumMv {
  width: 100%;
  .albumMv_top {
    width: 800px;
    margin: 0 auto;
    .albumMv_top_body {
      width: 170px;
      height: 170px;
      float: left;
      margin-right: 40px;
      // margin-bottom: 20px;
      position: relative;
      .albumMv_top_body_icon {
        position: absolute;
        left: 50%;
        top: 37%;
        transform: translate(-50%,-50%);
        font-size: 35px;
        color: rgb(79, 83, 94);
        display: none;
      }
      img {
        width: 170px;
        height: 120px;
        cursor: pointer;
      }
      img:hover + .albumMv_top_body_icon {
        display: block;
      }
      p {
        width: 170px;
        overflow:hidden;
        cursor: pointer;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
    }
    .albumMv_top_body:nth-child(4n) {
      margin-right: 0px;
    }
  }
  .albumMv_buttom {
    width: 100%;
    float: left;
    .albumMv_pagination {
      text-align: center;
    }
  }
}
</style>
