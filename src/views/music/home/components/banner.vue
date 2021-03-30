<template>
  <div id="banner">
    <!-- -------------------------------轮播图------------------------------------ -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in bannerData" :key="index">
          <img  :src="item.imageUrl" @click="imgRouter(item)">
          <p :style="{'background': item.titleColor}">{{ item.typeTitle }}</p>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>
<script>
  import Swiper from "swiper/bundle"
  import 'swiper/swiper-bundle.css'
  // import loopCreate from '.staging/swiper-8ab49017/cjs/components/core/loop/loopCreate';
  export default {
    props: {
      bannerData : {
        type: Array,
        default: null
      }
    },
    data () {
      return {
        // bannerData: []
      }
    },
    mounted() {
      this.swiperGather()
      // console.log(this.bannerData);
    },
    methods: { 
      imgRouter(item) {
        this.$message.success('轮播跳转暂未开发')
      },
      swiperGather() {
        const mySwiper = new Swiper ('.swiper-container', {
          effect: "cube",
          loop: true, // 循环模式选项
          observer: true,
          observeParents:true,
          // 自动切换
          autoplay: {
            delay: 3000, // 3秒切换一次
          },
          // 分页器
          pagination: {
            el: '.swiper-pagination',
          },
          // 前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        }) 
      }
    },
  };
</script>

<style lang="less">
#banner {
  width: 70%;
  margin: 0 auto;
  img {
    cursor: pointer;
  }
}
.swiper-container {
    width: 100%;
    height: 300px;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  // display: block;
}
.swiper-slide p {
  position: absolute;
  width: 72px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  color: #fff;
  bottom: 0px;
  right: 0px;
}
.swiper-container{
    --swiper-theme-color: #ff6600;
    --swiper-pagination-color: #00ff33;/* 两种都可以 */
  }
</style>