<template>
  <div id="singerList">
    <div class="singerList_head">
      热门歌手
    </div>
    <div class="singerList_Body">
      <div v-for="(item,index) in singerListData" :key="index" class="singerList_Body_Box">
        <img :src="item.img1v1Url" alt="">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singerListData : {
      type: Array,
      default: null
    },
  }
}
</script>

<style lang="less">
#singerList {
  width: 70%;
  height: 290px;
  margin: 0 auto;
  // background: red;
  .singerList_head {
    height: 30px;
    width: 100%;
    // background: red;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
  }
  .singerList_Body {
    .singerList_Body_Box {
      width: 8.2%;
      height: 120px;
      float: left;
      margin-right: 2%;
      position: relative;
      > img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        cursor: pointer;
      }
      > img:hover {
        animation: proRotate 1.5s ease-in-out 500ms alternate none 1;
      }
      > p {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        width: 100%;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        color: rgb(204, 140, 140);
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
  .singerList_Body div:nth-child(10n) {
    margin-right: 0%;
  }
  @keyframes proRotate { 
    0%{
        transform:perspective(400px) rotateY(0deg);
        position: absolute;
        left: 0px;
        top: 0px;
        right: 0px;
        bottom: 0px;
        margin: auto;
      } 
    100%{
      transform:perspective(400px) rotateY(360deg);
      position: absolute;
      left: 0px;
      top: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
    } 
  }
}
</style>
