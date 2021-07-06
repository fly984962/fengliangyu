<template>
  <div id="musicMv">
    <!-- -------------------------------推荐Mv------------------------------------ -->
    <div class="musicMvBox">
      <div class="musicMvBox_Head">
        <span>{{ musicMvTitle }}</span>
      </div>
      <div style="height:30px;margin-bottom:18px;">
        <span style="line-height:30px;font-weight: 550;cursor: pointer;margin: 0px 15px;" v-for="(item,index) in musicMvTitleList" :key="index" :style="{'color': (index == active ? 'red':'#000')}" @click="musicMvClick(item,index)">
          {{ item.area }}
        </span>
      </div>
      <div class="musicMvBox_Body">
        <div v-for="(item,index) in musicMvData" :key="index">
          <div class="musicMvBox_Body_Img">
            <img :src="item.cover" class="musicMvImg" @click="musicMvUrl(item)">
            <i class="el-icon-video-play iconPlay" @click="musicMvUrl(item)"></i>
          </div>
          <p style="color:#000;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ item.name }}</p>
          <p style="color:#99A4B7;font-size:12px;">{{ item.artistName }}</p>
          <p style="color:#99A4B7;font-size:12px;"><i class="el-icon-video-camera" style="margin-right:5px;"></i>{{ item.playCount }}</p>
        </div>
      </div>
    </div>
    <!-- mv -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  },
  props: {
    musicMvTitle : {
      type: String,
      default: null
    },
    musicMvData : {
      type: Array,
      default: null
    },
    musicMvTitleList : {
      type: Array,
      default: null
    }
  },
  methods: {
    musicMvUrl(val) {
      // console.log(val);
      this.$router.push({ path: '/mvplay', query:{ id: val.id }})
    },
    musicMvClick(item,index) {
      this.active = index
      this.$emit('musicMvUrlName', item.area)
    }
  }
}
</script>

<style lang="less">
#musicMv {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  .musicMvBox {
    height: 480px;
    // background: rgb(209, 136, 136);
    .musicMvBox_Head {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-weight: 700;
      font-size: 20px;
    }
    .musicMvBox_Body {
      > div {
        width: 18.4%;
        height: 180px;
        float: left;
        margin-bottom: 20px;
        margin-right: 2%;
        .musicMvBox_Body_Img {
          position: relative;
          .musicMvImg {
            width: 100%;
            height: 120px;
            cursor: pointer;
          }
          .iconPlay {
            font-size: 35px;
            color: rgb(79, 83, 94);
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            z-index: 999;
            cursor: pointer;
            display: none;
          }
          .musicMvImg:hover + .iconPlay {
            display: block;
            // animation: whirl 2s linear forwards;
            // animation-iteration-count:1;
          }
          .iconPlay:hover {
            display: block;
          }
        }
        > p {
          text-align: left;
          cursor: pointer;
        }
      }
      > div:nth-child(5n) {
        margin-right: 0%;
      }
    }
  }
  // @keyframes whirl {
  //   0%   {font-size: 38px;}
  //   10%   {font-size: 40px;}
  //   20%   {font-size: 42px;}
  //   30%   {font-size: 44px;}
  //   40%   {font-size: 46px;}
  //   50%   {font-size: 48px;}
  //   60%  {font-size: 50px;}
  //   70%  {font-size: 52px;}
  //   80%  {font-size: 54px;}
  //   90% {font-size: 56px;}
  //   10% {font-size: 58px;}
  // }
}
</style>
