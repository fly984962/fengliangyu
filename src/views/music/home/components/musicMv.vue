<template>
  <div id="musicMv">
    <div class="musicMvBox">
      <div class="musicMvBox_Head">
        <span>{{ musicMvTitle }}</span>
      </div>
      <div class="musicMvBox_Body">
        <div v-for="(item,index) in musicMvData" :key="index">
          <img :src="item.cover" class="musicMvImg" @click="musicMvUrl(item)">
        </div>
      </div>
    </div>
    <!-- mv -->
  </div>
</template>

<script>
export default {
  props: {
    musicMvTitle : {
      type: String,
      default: null
    },
    musicMvData : {
      type: Array,
      default: null
    }
  },
  methods: {
    musicMvUrl(val) {
      // console.log(val);
      // this.$emit('musicMvUrlId', val.id)
      this.$router.push({ path: '/mvplay', query:{ id: val.id }})
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
        height: 120px;
        float: left;
        margin-bottom: 20px;
        margin-right: 2%;
        .musicMvImg {
          width: 100%;
          height: 120px;
        }
      }
      > div:nth-child(5n) {
        margin-right: 0%;
      }
    }
  }
}
</style>
