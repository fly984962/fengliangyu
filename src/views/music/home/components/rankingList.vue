<template>
  <div id="rankingList">
    <!-- --------------------------------排行榜---------------------------------- -->
    <div class="rankingListHead">
      {{ rankingListTitle }}
    </div>
    <div class="rankingListBody">
      <div class="rankingListBodyOne">
        <div class="rankingListBodyOne_Head">
          <img src="../../../../assets/images/biao.jpg">
          <p class="rankingListBodyOne_Head_p1">飙升榜</p>
          <br>
          <p class="el-icon-video-play rankingListBodyOne_Head_p2" @click="newSongClick(soaringData[0])"></p>
        </div>
        <div class="rankingListBodyOne_Foot">
          <div v-for="(item,index) in soaringData" :key="index">
            <span>{{ index+1 }}：</span>
            <span class="spanHover" @click="newSongClick(item)">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="rankingListBodyOne">
        <div class="rankingListBodyOne_Head">
          <img src="../../../../assets/images/xin.jpg">
          <p class="rankingListBodyOne_Head_p1">新歌榜</p>
          <br>
          <p class="el-icon-video-play rankingListBodyOne_Head_p2" @click="newSongClick(newSongData[0])"></p>
        </div>
        <div class="rankingListBodyOne_Foot">
          <div v-for="(item,index) in newSongData" :key="index">
            <span :style="{'color': (index == [0,1,2].includes(index) ? 'red':'#000')}">{{ index+1 }}：</span>
            <span class="spanHover" @click="newSongClick(item)">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="rankingListBodyOne" style="margin-right:0;">
        <div class="rankingListBodyOne_Head">
          <img src="../../../../assets/images/yuan.jpg">
          <p class="rankingListBodyOne_Head_p1">原创榜</p>
          <br>
          <p class="el-icon-video-play rankingListBodyOne_Head_p2" @click="newSongClick(originalData[0])"></p>
        </div>
        <div class="rankingListBodyOne_Foot">
          <div v-for="(item,index) in originalData" :key="index">
            <span>{{ index+1 }}：</span>
            <span class="spanHover" @click="newSongClick(item)">{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div></div> -->
  </div>
</template>

<script>
export default {
  props: {
    rankingListTitle : {
      type: String,
      default: null
    },
    rankingListData : {
      type: Array,
      default: null
    },
    soaringData : {
      type: Array,
      default: null
    },
    newSongData : {
      type: Array,
      default: null
    },
    originalData : {
      type: Array,
      default: null
    },
  },
  mounted() {
    console.log(this.$store.state.musicId)
  },
  methods: {
    newSongClick(item) {
      console.log(item)
      this.$store.state.musicId = item.id
    }
  },
}
</script>

<style lang="less">
#rankingList {
  width: 70%;
  margin: 0 auto;
  .rankingListHead {
    width: 100%;
    height: 30px;
    line-height: 30px;
    // background: red;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 18px;
  }
  .rankingListBody {
    height: 600px;
    > div:nth-child(1) {
      background-image: linear-gradient(#e66465, #9198e5);
    }
    > div:nth-child(2) {
      background-image: linear-gradient(#8a77f3, #cfe591);
    }
    > div:nth-child(3) {
      background-image: linear-gradient(#e6d175, #d085e7);
    }
    .rankingListBodyOne{
      padding: 20px;
      box-sizing: border-box;
      width: 32%;
      height: 600px;
      // background-image: linear-gradient(#e66465, #9198e5);
      float: left;
      margin-right: 2%;
      .rankingListBodyOne_Head{
        width: 100%;
        // background: red;
        height: 15%;
        > img {
          height: 100%;
          float: left;
        }
        .rankingListBodyOne_Head_p1 {
          float: left;
          margin-top: 13px;
          margin-left: 10px;
          font-size: 16px;
          font-weight: 600;
        }
        .rankingListBodyOne_Head_p2 {
          font-size: 30px;
          margin-top: 20px;
          margin-left: -50px;
          // color: #FB65C0;
        }
        .rankingListBodyOne_Head_p2:hover {
          color:#C0C0C0;
        }
      }
      .rankingListBodyOne_Foot {
        width: 100%;
        height: 85%;
        // background: yellow;
        // overflow: hidden;
        > div{
          width: 100%;
          height: 10%;
          padding-top: 11px;
          box-sizing: border-box;
          .spanHover {
            cursor: pointer;
          }
        }
      }
    }
    // .rankingListBodyTwo{
    //   width: 32%;
    //   height: 600px;
    //   background-image: linear-gradient(#75e6e0, #d085e7);
    //   float: left;
    //   margin-right: 2%;
    // }
    // .rankingListBodyThree{
    //   width: 32%;
    //   height: 600px;
    //   background-image: linear-gradient(#8a77f3, #cfe591);
    //   float: left;
    // }
  }
}
</style>
