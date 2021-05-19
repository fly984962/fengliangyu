<template>
  <div id="artists">
    <p class="artists_top">{{ artistsName }}简介</p>
    <p style="text-indent:2em; font-size:12px;line-height:25px;">{{ artistsData.briefDesc }}</p>
    <div v-for="(item,index) in artistsData.introduction" :key="index">
      <div>
        <h2 style="margin: 28px 0 8px 0;font-size: 14px;color: #333;">{{item.ti}}</h2>
        <p v-for="(txt,txtIndex) in item.txt" :key="txtIndex" style="line-height:25px;color: #666;font-size:12px;">{{txt}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    artistsData : {
      type: Object,
      default: null
    },
    artistsName : {
      type: String,
      default: null
    }
  },
  data() {
    return {
      introduction: []
    }
  }
}
</script>

<style lang="less">
#artists {
  .artists_top {
    width: 100%;
    height: 20px;
    padding-left: 7px;
    box-sizing: border-box;
    border-left: 7px solid #c10d0c;
    line-height: 20px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }
}
</style>
