<template>
  <div id="works">
    <el-table
      :data="hotSongs"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        prop="index"
        align="center"
        label=""
        width="50">
        <template slot-scope="scope">
          <span v-if="scope.row.id == musicId ? false : true" style="font-size:12px">{{ scope.row.index }}</span>
          <img v-if="scope.row.id == musicId ? true : false" style="width:20px;height:20px;" src="../../../assets/images/11111111111.gif" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        align="center">
        <template slot-scope="scope">
          <span style="font-size:12px;color:red;cursor:pointer;" @click="nameClick(scope.row)">{{ scope.row.name }}</span>
          <span v-if="scope.row.mv !== 0" style="margin-left:5px;" class="el-icon-video-camera"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        align="center">
        <template slot-scope="scope">
          <span>00:00</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        align="center">
        <template slot-scope="scope">
          <span style="font-size:12px;color:red;cursor:pointer;" @click="albumNameClick(scope.row.al.id)">{{ scope.row.al.name }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    hotSongs : {
      type: Array,
      default: null
    }
  },
  computed: {
    ...mapState(['musicId'])
  },
  methods: {
    nameClick(row) {
      this.$store.state.musicId = row.id
    },
    albumNameClick(id) {
      this.$router.push({ path: '/musicTheAlbum', query:{ id: id }})
    }
  }
}
</script>

<style lang="less">
#works {
  .has-gutter {
    display: none;
  }
}
</style>
