<template>
  <div id="routerList">
    <div id="routerListBox">
      <el-button class="routerListBox_musicBtn" @click="musicBtn">网易云音乐</el-button>
      <el-button class="routerListBox_backstageBtn">后台管理</el-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    musicBtn() {
      this.$router.push({ path: '/music'})
    }
  }
}
</script>

<style lang="less">
#routerList {
  height: 100vh;
  width: 100%;
  background: rgb(79, 79, 112);
  position: relative;
  #routerListBox {
    width:400px;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .routerListBox_musicBtn {
      // float: left;
      margin: 0 auto;
      margin-right: 10px;
    }
    .routerListBox_backstageBtn {
      // float: left;
      margin: 0 auto;
      margin-left: 10px;
    }
  }
}
</style>
