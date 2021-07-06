<template>
  <div id="musicSong">
    <div class="musicSong_top">
      <div class="musicSong_top_left">
        <img :src="playlistImg" alt="">
      </div>
      <div class="musicSong_top_right">
        <div class="musicSong_top_right_top">
          <div class="musicSong_top_right_top_left">
            <span>歌单</span>
            <span></span>
          </div>
          <div class="musicSong_top_right_top_right">
            <span>{{ playlistTitle }}</span>
          </div>
        </div>
        <div class="musicSong_top_right_center">
          <div class="musicSong_top_right_center_left">
            <img :src="logoImg" alt="">
          </div>
          <div class="musicSong_top_right_center_center">
            <span>云音乐官方歌单</span>
            <img :src="identityIconUrl" alt="">
            <span style="color:#999;margin-left:20px;">{{ createTime }}<span style="color:#999;margin-left:5px;">创建</span></span>
          </div>
        </div>
        <div class="musicSong_top_right_bottom">
          <div class="musicSong_top_right_bottom_top">
            <span class="musicSong_top_right_bottom_top_span">标签：<span v-for="(item,index) in tags" :key="index">{{ item }}</span></span>
          </div>
          <div class="musicSong_top_right_bottom_bottom">
            <p v-for="(item,index) in description" :key="index">
              <span :style="{'display': (index == 0 ? 'inline-block':'none')}">介绍：</span>{{ item }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="musicSong_body">
      <div class="musicSong_body_top">
        <span style="font-size:28px;">歌曲列表</span>
        <span style="font-size:12px;margin-left:10px;">{{ songLength }}首歌</span>
        <span style="font-size:12px;">(找不到分页的参数,全展示太多了,只展示10条)</span>
        <span style="font-size:12px;float:right;margin-right:30px;">播放：<span style="color:red;">{{ playCount }}</span>次</span>
      </div>
      <div class="musicSong_body_body">
        <div class="musicSong_body_body_left">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
              type="index"
              label=""
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
              align="center"
              width="200">
              <template slot-scope="scope">
                <span style="font-size:12px;color:red;cursor:pointer;" @click="nameClick(scope.row)">{{ scope.row.name }}</span>
                <span v-if="scope.row.mv !== 0" style="margin-left:5px;" class="el-icon-video-camera"></span>
              </template>
            </el-table-column>
            <el-table-column
              prop="publishTime"
              label="发布时间"
              align="center"
              show-overflow-tooltip
              width="150">
               <template slot-scope="scope">
                <span style="font-size:12px">{{ scope.row.publishTime }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="歌手"
              align="center"
              show-overflow-tooltip
              width="150">
              <template slot-scope="scope">
                <span style="margin-left:3px;font-size:12px" v-for="(item,index) in scope.row.ar" :key="index">{{ item.name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              align="center"
              show-overflow-tooltip
              label="专辑">
              <template slot-scope="scope">
                <span style="font-size:12px">{{ scope.row.al.name }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="musicSong_body_body_left_comments">
            <div class="musicSong_body_body_left_comments_top">
              <span style="font-size:16px;cursor:pointer;">评论</span>
            </div>
            <div class="musicSong_body_body_left_comments_input">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                style="margin-bottom:8px;"
                :rows="6" 
                resize="none"
                v-model="text"
                maxlength="140"
                show-word-limit
              />
              <div style="height:30px;">
                <el-button size="mini" type="primary" style="float:right;" @click="submitClick">提交</el-button>
              </div>
            </div>
            <div class="musicSong_body_body_left_comments_comments">
              <span style="font-size:12px;cursor:pointer;">最新评论</span>
            </div>
            <div style="height:15px;">
              {{ null }}
            </div>
            <div v-for="(item,index) in comments" :key="index" style="width:100%;height:75px;margin-bottom:7px;border-bottom:1px dashed #999;">
              <img :src="item.user.avatarUrl" alt="" style="width:50px;float:left;">
              <div style="margin-left:10px;float:left;width:650px;">
                <p style="color:#0c73c2;font-size:12px;margin-bottom:7px;">{{ item.user.nickname }}</p>
                <p style="font-size:12px;margin-bottom:12px;">
                  <span style="margin-right:5px;">{{ item.time }}</span><span>{{ item.timeB }}</span>
                </p>
                <p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:650px;font-size:12px;">{{ item.content }}</p>
              </div>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </div>
        <div class="musicSong_body_body_right">
          <div class="musicSong_body_body_right_top">
            <span style="font-size:12px;cursor:pointer;">喜欢这个歌单的人</span>
          </div>
        </div>
      </div>
      <div class="musicSong_body_bottom">
        
      </div>
    </div>
    <div style="width:100%;height:600px;">
      {{ null }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../../api/music/index.js'
export default {
  data() {
    return {
      playlistImg: '', // 歌单图片
      playlistTitle: '', // 歌单名字
      logoImg: '',
      identityIconUrl: '',
      createTime: '',
      tags: [],
      description: [],
      tableData: [],
      songLength: '',
      playCount: '',
      text: '',
      offset: '1', // 分页
      comments: [], // 评论
      total: 0
    }
  },
  mounted() {
    api.getMusicDynamic(this.$route.query.id).then(res => {
      // console.log(res, '歌单详情动态')
      if (res.status == 200) {
        this.total = res.data.commentCount
      }
    })
    api.getplaylistDetail(this.$route.query.id).then(res => {
      if (res.status == 200) {
        let createTimeData = ''
        let musicIdData = []
        this.playlistImg = res.data.playlist.coverImgUrl // 歌单图片
        this.playCount = res.data.playlist.playCount // 歌单播放次数
        this.playlistTitle = res.data.playlist.name // 歌单名称
        this.logoImg = res.data.playlist.creator.avatarUrl // 官方歌单Logo
        this.description = res.data.playlist.description.split("\n"); // 介绍换行切割转数组遍历展示
        this.tags = res.data.playlist.tags // 歌单标签
        this.identityIconUrl = res.data.playlist.creator.avatarDetail.identityIconUrl // v图片
        createTimeData = new Date(res.data.playlist.createTime) // 歌单创建时间
        this.createTime = `${createTimeData.getFullYear()}-${createTimeData.getMonth()+1}-${createTimeData.getDate()}` // 拼接歌单创建时间
        res.data.playlist.trackIds.map(item => { // 遍历歌单获取所有id
          musicIdData.push(item.id)
        })
        api.getParticulars(musicIdData.toString()).then(res => {
          if (res.status == 200) {
            let singerName = []
            this.tableData = res.data.songs.slice(0,10)
            this.songLength = res.data.songs.length
            // console.log(res, '歌曲详情');
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].index = i + 1
            }
            this.tableData.map(item => {
              let publishTimeData = new Date(item.publishTime)
              item.publishTime = `${publishTimeData.getFullYear()}-${publishTimeData.getMonth()+1}-${publishTimeData.getDate()}`
            })
          }
        })
        console.log(res, '歌单详情')
        // console.log(musicIdData.toString(), '歌曲ID')
      }
    })
    this.offsetHttp()
  },
  computed: {
    ...mapState(['musicId'])
  },
  methods: {
    nameClick(row) {
      // console.log(row)
      this.$store.state.musicId = row.id
    },
    offsetHttp() {
      api.getMusicComment(this.$route.query.id,this.offset).then(res => {
        if (res.status == 200) {
          // console.log(res.data, '歌单评论')
          res.data.comments.map(item => {
            let time = new Date(item.time)
            item.time = `${time.getFullYear()}年${time.getMonth()+1}月${time.getDate()}日`
            let a = time.getHours()
            let b = time.getMinutes()
            if (a.toString().length == 1) {
              a = '0' + a
            }
            if (b.toString().length == 1) {
              b = '0' + b
            }
            item.timeB = `${a}时${b}分`
          })
          // this.time = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`
          this.comments = res.data.comments
        }
      })
    },
    handleCurrentChange(val) {
      console.log(val)
      this.offset = val
      this.offsetHttp()
    },
    submitClick() {
      this.$message.error('暂不支持评论');
    }
  },
}
</script>

<style lang="less">
#musicSong {
  width: 1125px;
  height: 2070px;
  margin-bottom: 60px;
  background: red;
  margin: 0 auto;
  background: #F5F5F5;
  border-left: 1px solid #999;
  border-right: 1px solid #999;
  padding: 20px;
  box-sizing: border-box;
  .musicSong_top {
    width: 100%;
    height: 300px;
    // background: yellow;
    .musicSong_top_left {
      width: 250px;
      height: 100%;
      // background: green;
      float: left;
      position: relative;
      img {
        width: 200px;
        height: 200px;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
    .musicSong_top_right {
      float: left;
      width: 830px;
      height: 300px;
      // background: red;
      .musicSong_top_right_top {
        width: 100%;
        height: 50px;
        margin-bottom: 10px;
        // background: yellow;
        .musicSong_top_right_top_left {
          width: 100px;
          height: 100%;
          // background: blue;
          float: left;
          position: relative;
        }
        .musicSong_top_right_top_left span:nth-child(1) {
          display: inline-block;
          width: 65%;
          height: 70%;
          background: red;
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          text-align: center;
          line-height: 35px;
          color: #fff;
        }
        .musicSong_top_right_top_left span:nth-child(2) {
          position: absolute;
          top: 7px;
          right: 0;
          width: 0;
          height: 0;
          border-top: 18px solid transparent;
          border-left: 36px solid red;
          border-bottom: 18px solid transparent;
        }
        .musicSong_top_right_top_right {
          float: left;
          width: 700px;
          height: 100%;
          // background: blue;
          padding: 10px;
          box-sizing: border-box;
          line-height: 27px;
          font-size: 23px;
        }
      }
      .musicSong_top_right_center {
        width: 100%;
        height: 40px;
        margin-bottom: 10px;
        // background: yellow;
        .musicSong_top_right_center_left {
          width: 60px;
          height: 40px;
          float: left;
          img {
            width: 40px;
            height: 40px;
          }
        }
        .musicSong_top_right_center_center {
          float: left;
          span {
            line-height: 40px;
            font-size: 12px;
            color: #0c73c2;
            display: inline-block;
          }
          img {
            width: 12px;
            height: 12px;
          }
        }
      }
      .musicSong_top_right_bottom {
        width: 100%;
        height: 120px;
        // background: yellow;
        .musicSong_top_right_bottom_top {
          width: 100%;
          height: 40px;
          margin-bottom: 10px;
          // background: red;
          .musicSong_top_right_bottom_top_span {
            font-size: 12px;
            line-height: 40px;
            span {
              display: inline-block;
              // width: 40px;
              padding: 0px 10px;
              height: 25px;
              line-height: 25px;
              text-align: center;
              border-radius: 20px;
              margin-right: 5px;
              background: rgb(161, 159, 159);
            }
          }
        }
        .musicSong_top_right_bottom_bottom {
          width: 100%;
          // height: 300px;
          // background: red;
          font-size: 12px;
        }
      }
    }
  }
  .musicSong_body {
    width: 100%;
    // height: 300px;
    // background: red;
    .musicSong_body_top {
      width: 100%;
      height: 50px;
      line-height: 50px;
      // background: blue;
    }
    .musicSong_body_body {
      .musicSong_body_body_left {
        width: 70%;
        float: left;
        border-right: 1px solid #999;
        box-sizing: border-box;
        padding-right: 20px;
        .musicSong_body_body_left_comments {
          width: 100%;
          height: 700px;
          margin-top: 20px;
          .musicSong_body_body_left_comments_top {
            width: 100%;
            height: 30px;
            // background: red;
            line-height: 30px;
            margin-bottom: 10px;
            border-bottom: 2px solid #c20c0c;
          }
          .musicSong_body_body_left_comments_input {
            width: 100%;
          }
          .musicSong_body_body_left_comments_comments {
            width: 100%;
            height: 30px;
            border-bottom: 1px solid #cfcfcf;
          }
        }
      }
      .musicSong_body_body_right {
        width: 30%;
        height: 300px;
        // background: yellow;
        padding-left: 20px;
        box-sizing: border-box;
        float: left;
        .musicSong_body_body_right_top {
          width: 100%;
          height: 20px;
          // background: red;
          border-bottom: 1px solid #999;
          // margin-bottom: 8px;
        }
      }
    }
    // .el-table__row {
    //   max-width: 30px;
    //   min-width: 30px;
    //   height: 30px;
    // }
  }
  // .musicSong_body_bottom {
  //   width: 70%;
  //   height: 900px;
  //   background: red;
  // }
}
</style>
