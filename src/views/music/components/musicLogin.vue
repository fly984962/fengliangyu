<template>
  <div id="musicLogin">
    <p style="text-align:right;"><i class="el-icon-close" @click="loginNone"></i></p>
    <div class="musicLoginBox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="手机登录" name="1">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="66px">
            <el-form-item label="账号" prop="username">
              <el-input size="mini" style="width:80%;" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" size="mini" style="width:80%;" v-model="ruleForm.password"></el-input>
            </el-form-item>
          </el-form>
          <p style="text-align:center;width:60px;height:30px;margin:0 auto;line-height:30px;background:rgb(223, 236, 100);" @click="loginClick">登录</p>
          <!-- <el-button style="margin:0 auto;">登录</el-button> -->
        </el-tab-pane>
        <el-tab-pane label="验证码登录" name="2"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../../../api/music/index.js'
export default {
  data() {
    return {
      activeName: '1',
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username:[{ required: true, message: '请输入账号', trigger: 'change' }],
        password:[{ required: true, message: '请输入密码', trigger: 'change' }],
      }
    }
  },
  computed: {
    ...mapState(['musicId','loginframe','statusData'])
  },
  methods: {
    loginClick() {
      api.getmusicLogin(this.ruleForm.username,this.ruleForm.password).then(res => {
        console.log('登录', res)
        if (res.data.code == 200) {
          this.$store.state.statusData = res.data // 登录成功返回的用户数据
          this.$store.state.topLogin = false // 隐藏顶部的登录
          this.$store.state.loginframe = false // 关闭登录框
          this.$store.state.loginImg = true // 顶部显示头像
          console.log('登录信息', this.$store.state.statusData)
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    loginNone() {
      this.$store.state.loginframe = false
    }
  },
}
</script>

<style lang="less">
#musicLogin {
  .musicLoginBox {
    padding: 20px;
    box-sizing: border-box;
    > p {
      color: rgb(223, 236, 100);
      
    }
  }
}
</style>
