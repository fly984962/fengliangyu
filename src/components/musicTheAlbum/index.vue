<template>
  <div id="musicTheAlbum">
    <div class="musicTheAlbum_top">
      <div class="musicTheAlbum_top_top">
        <div class="musicTheAlbum_top_top_left">
          <img :src="AlbumImg" alt="">
        </div>
        <div class="musicTheAlbum_top_top_right">
          <div class="musicTheAlbum_top_top_right_top">
            <img src="../../assets/images/专辑.png" alt="">
            <span>{{ AlbumName }}</span>
          </div>
          <div class="musicTheAlbum_top_top_right_buttom">
            <p>歌手：<span style="color:#0c73c2;">{{ AlbumSinger }}</span></p>
            <p>发行时间：{{ publishTime }}</p>
            <p>发行公司：{{ company }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="musicTheAlbum_body" :style="musicTheAlbum_body_style">
      <p>专辑介绍：</p>
      <p v-for="(item,index) in description" :key="index" style="font-size:12px;text-indent:25px;"> {{ item }} </p>
    </div>
    <div style="width:100%;height:30px;">
      <p v-if="Packup" style="float:right;cursor:pointer;color:#0c73c2;" @click="PackupClick">收起<span class="el-icon-arrow-up"></span></p>
      <p v-if="an" style="float:right;cursor:pointer;color:#0c73c2;" @click="anClick">展开<span class="el-icon-arrow-down"></span></p>
    </div>
    <div class="musicTheAlbum_bottom">
      <div class="musicTheAlbum_bottom_left">
        <p style="font-size:20px;margin-bottom:8px;">包含歌曲列表<span style="font-size:12px;margin-left:10px;">{{ songsLength }}首歌</span></p>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%;margin-bottom:40px;">
          <el-table-column
            prop="date"
            label=""
            show-overflow-tooltip
            align="center"
            width="50">
            <template slot-scope="scope">
              <span v-if="scope.row.id == musicId ? false : true" style="font-size:12px">{{ scope.row.index }}</span>
              <img v-if="scope.row.id == musicId ? true : false" style="width:20px;height:20px;" src="../../assets/images/11111111111.gif" alt="">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="歌曲标题"
            show-overflow-tooltip
            align="left">
            <template slot-scope="scope">
              <span style="font-size:12px;cursor:pointer;color:red;" @click="nameClick(scope.row)">{{ scope.row.name }}</span>
              <span v-if="scope.row.mv !== 0" style="margin-left:5px;cursor:pointer;" class="el-icon-video-camera"></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            align="center"
            width="120"
            label="时长">
            <template slot-scope="scope">
              <span style="font-size:12px;cursor:pointer;">00:00</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            show-overflow-tooltip
            width="120"
            align="center"
            label="歌手">
            <template slot-scope="scope">
              <span style="cursor:pointer;font-size:12px;">{{ scope.row.ar[0].name }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="musicTheAlbum_bottom_left_comments">
          <p>
            <span>评论</span>
            <span style="font-size:12px;margin-left:10px;">共000条评论</span>
          </p>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            style="margin-bottom:8px;"
            :rows="6" 
            resize="none"
            v-model="comments"
            maxlength="140"
            show-word-limit
          />
          <div style="height:30px;">
            <el-button size="mini" type="primary" style="float:right;" @click="submitClick">提交</el-button>
          </div>
        </div>
        <div class="musicTheAlbum_bottom_left_comments_page">
          <span style="font-size:12px;cursor:pointer;">最新评论</span>
        </div>
        <div style="z-index:999" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
          <div v-for="(item,index) in thisAlbumComment" :key="index" style="width:100%;height:75px;margin-bottom:7px;border-bottom:1px dashed #999;">
            <img :src="item.user.avatarUrl" alt="" style="width:50px;float:left;">
            <div style="margin-left:10px;float:left;width:650px;">
              <p style="color:#0c73c2;font-size:12px;margin-bottom:7px;">{{ item.user.nickname }}</p>
              <p style="font-size:12px;margin-bottom:12px;">
                <span style="margin-right:5px;">{{ item.time }}</span>
              </p>
              <p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:650px;font-size:12px;">{{ item.content }}</p>
            </div>
          </div>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          style="margin-bottom:15px;"
          :total="total"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <div class="musicTheAlbum_bottom_right">
        <div class="musicTheAlbum_bottom_right_top">
          <span style="font-size:12px;cursor:pointer;">喜欢这个专辑的人</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/music/index.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      AlbumImg: '', // 专辑封面
      AlbumName: '', // 专辑名称
      AlbumSinger: '', // 专辑歌手
      company: '', // 发行公司
      publishTime: '', // 发行时间
      description: [], // 专辑介绍
      loading: false,
      musicTheAlbum_body_style: {
        'height' : '200px',
        'overflow' : 'hidden'
      },
      songsLength: '0', // 专辑多少首歌
      tableData: [], // 表格数据
      Packup: false,
      an: true,
      comments: '', // 评论内容
      thisAlbumComment: [], // 评论
      total: 0, // 评论条数
      offset: 1 // 评论页数
    }
  },
  computed: {
    ...mapState(['musicId'])
  },
  watch: {
    description() {
      if (this.description.length < 10) {
        this.Packup = false
        this.an = false
        this.musicTheAlbum_body_style.height = 'auto'
      }
    }
  },
  mounted() {
    this.albumComment()
    api.getMusicAlbum(this.$route.query.id).then(res => {
      // console.log(res, '新碟详情动态')
      if (res.status == 200) {
        let publishTime = new Date(res.data.album.publishTime)
        this.AlbumImg = res.data.album.blurPicUrl
        this.AlbumName = res.data.album.name
        this.AlbumSinger = res.data.album.artist.name
        this.company = res.data.album.company
        this.description = res.data.album.description.split("\n")
        this.publishTime = `${publishTime.getFullYear()}-${publishTime.getMonth()+1}-${publishTime.getDate()}`
        this.tableData = res.data.songs
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].index = i + 1
        }
        this.songsLength = res.data.songs.length
      } else {
        this.$message.error('新碟详情请求失败')
      }
    })
  },
  methods: {
    PackupClick() {
      this.Packup = false
      this.an = true
      this.musicTheAlbum_body_style.height = "200px"
    },
    submitClick() {
      this.$message.error('暂不支持评论');
    },
    anClick() {
      this.Packup = true
      this.an = false
      this.musicTheAlbum_body_style.height = "auto"
    },
    nameClick(row) {
      // console.log(row)
      this.$store.state.musicId = row.id
    },
    handleCurrentChange(val) {
      this.offset = val
      this.albumComment()
    },
    albumComment() { // 专辑评论
      this.loading = true
      api.getMusicAlbumComment(this.$route.query.id, this.offset).then(res => {
        if (res.status == 200) {
          // console.log(res);
          res.data.comments.map(item => {
            let it = new Date(item.time)
            item.time = `${it.getFullYear()}-${it.getMonth()+1}-${it.getDate()}`
          })
          this.thisAlbumComment = res.data.comments
          this.total = res.data.total
          this.loading = false
        } else {
          this.$message.error('专辑评论请求失败')
        }
      })
    }
  },
}
</script>
<style lang="less">
#musicTheAlbum {
  width: 1125px;
  // height: 2413px;
  // background: #F5F5F5;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  border-left: 1px solid #999;
  border-right: 1px solid #999;
  .musicTheAlbum_top {
    width: 100%;
    margin-bottom: 20px;
    .musicTheAlbum_top_top {
      width: 100%;
      height: 200px;
      // background: red;
      .musicTheAlbum_top_top_left {
        width: 250px;
        height: 200px;
        // background: blueviolet;
        float: left;
        > img {
          width: 200px;
          height: 200px;
        }
      }
      .musicTheAlbum_top_top_right {
        float: left;
        width: 800px;
        .musicTheAlbum_top_top_right_top {
          width: 100%;
          height: 50px;
          margin-bottom: 15px;
          > img {
            height: 50px;
            float: left;
          }
          > span {
            display: block;
            float: left;
            line-height: 50px;
            font-size: 25px;
          }
        }
        .musicTheAlbum_top_top_right_buttom {
          width: 100%;
          > p {
            font-size: 12px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
  .musicTheAlbum_body {
    width: 100%;
    // height: 300px;
    // background: red;
  }
  .musicTheAlbum_bottom {
    width: 100%;
    // height: 100px;
    // margin-bottom: 60px;
    background: yellow;
    .musicTheAlbum_bottom_left {
      width: 70%;
      float: left;
      padding-right: 20px;
      margin-bottom: 60px;
      box-sizing: border-box;
      border-right: 1px solid #999;
      // border-left: 1px solid #999;
      .el-table__header-wrapper {
        border-top: 2px solid #c20c0c;
      }
      .musicTheAlbum_bottom_left_comments {
        width: 100%;
        margin-bottom: 8px;
        // height: 300px;
        // background: red;
        p {
          width: 100%;
          height: 30px;
          line-height: 30px;
          // background: yellow;
          box-sizing: border-box;
          font-size: 20px;
          margin-bottom: 15px;
          border-bottom: 2px solid #c20c0c;
        }
      }
      .musicTheAlbum_bottom_left_comments_page {
        width: 100%;
        height: 30px;
        margin-bottom: 15px;
        border-bottom: 1px solid #cfcfcf;
      }
    }
    .musicTheAlbum_bottom_right {
      width: 30%;
      float: left;
      padding-left: 20px;
      box-sizing: border-box;
      .musicTheAlbum_bottom_right_top {
        width: 100%;
        height: 20px;
        border-bottom: 1px solid #999;
      }
    }
  }
}
</style>
