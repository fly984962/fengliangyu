<template>
  <div id="newPlate">
    <!-- ------------------------------新碟上架---------------------------------- -->
    <div class="newPlateBody">
      <span>{{ newPlateTop }}</span>
      <div class="newPlateBody_body">
        <span v-for="(item,i) in PlateData" :key="i" :style="{'color': (i == active ? 'red':'#000')}" @click="plateDataFun(item,i)">
          {{ item.country }}
        </span>
      </div>
      <div class="newPlateFoot">
        <div class="newPlateFootBox" v-for="(item,index) in PlateDataList" :key="index" :src="item.blurPicUrl" @click="newPlateFootFun(item)">
          <img class="newPlateFootImgUrl" :src="item.blurPicUrl" @click="musicTheAlbumClick(item)">
          <img class="newPlateFootImg" src="../../../../assets/images/888.png">
          <span class="newPlateFootOne" style="width:165px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ item.name }}</span>
          <span class="newPlateFootTwo">{{ item.artists[0].name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newPlateTop : {
      type: String,
      default: null
    },
    PlateData : {
      type: Array,
      default: null
    },
    PlateDataList : {
      type: Array,
      default: null
    },
  },
  data() {
    return {
      active: '0'
    }
  },
  methods: {
    plateDataFun(item,index) {
      this.active = index
      this.$emit('plateDataMet', item.area)
    },
    newPlateFootFun(item) {
      console.log(item)
    },
    musicTheAlbumClick(val) {
      this.$router.push({ path: '/musicTheAlbum', query:{ id: val.id }})
    }
  }
}
</script>

<style lang="less">
#newPlate {
  width: 70%;
  margin: 0 auto;
  text-align: center;
  .newPlateBody {
    > span {
      line-height: 30px;
      font-weight: 700;
      font-size: 20px;
    }
    .newPlateBody_body {
      width: 100%;
      height: 30px;
      margin-bottom: 10px;
      > span {
        line-height: 30px;
        font-weight: 550;
        cursor: pointer;
        margin: 0px 15px;
      }
    }
    .newPlateFoot{
      width: 100%;
      height: 360px;
      .newPlateFootBox {
        position: relative;
        width: 32%;
        height: 100px;
        margin-right: 2%;
        margin-bottom: 20px;
        float: left;
        background: #F6F6F6;
        .newPlateFootImgUrl {
          height: 100%;
          cursor: pointer;
          float: left;
          z-index: 999;
          position: absolute;
          top: 0;
          left: 0;
        }
        .newPlateFootImgUrl:hover+.newPlateFootImg {
          animation: whirl 1s linear infinite;
        }
        .newPlateFootOne {
          font-weight: 700;
          text-align: left;
          position: absolute;
          font-size: 15px;
          top: 28%;
          left: 40%;
          cursor: pointer;
        }
        .newPlateFootTwo {
          // font-weight: 700;
          position: absolute;
          font-size: 12px;
          top: 50%;
          left: 40%;
          cursor: pointer;
        }
        .newPlateFootImg {
          position: absolute;
          width: 80px;
          height: 80px;
          left: 48px;
          top: 10px;
        }
      }
      > div:nth-child(3n) {
        margin-right: 0%;
      }
    }
  }
  @keyframes whirl {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
