<template>
  <div>
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <span v-else class="userinfo-avatar"></span>
      <div class="userinfo-nickname">
        <b>{{userInfo.nickName}}</b>
      </div>
    </div>
    <div class="getBtn-box">
      <van-button block type="info" open-type="getUserInfo" @getuserinfo="getUserInfo" :loading="getting" :disabled="userInfo.gender">用户授权</van-button>
    </div>
    <div>{{res}}</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      getting: false,
      userInfo: {
        nickName: '未授权',
        avatarUrl: ''
      },
      res: ''
    }
  },
  components: {
  },
  methods: {
    bindViewTap () {
      const url = '../layout/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    getUserInfo () {
      // 查看是否授权
      this.getting = true
      let that = this
      wx.getSetting({
        success (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              lang: 'zh_CN',
              success: (res) => {
                that.userInfo = res.userInfo
                that.$store.commit('initUserInfo', res.userInfo)
                // console.log(that.userInfo)
                that.getting = false
                let url = '/pages/layout/main'
                mpvue.redirectTo({ url })
              },
              fail: (err) => {
                console.log(err)
                that.getting = false
              }
            })
          }
        },
        complete: () => {
          that.getting = false
        }
      })
    }
  },
  beforeMount () {
    this.getUserInfo()
  },
  created () {

  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 300rpx 20rpx
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
  background-color: #fafafa
}

.userinfo-nickname {
  color: #aaa;
}

.getBtn-box{
  max-width: 80%;
  margin: 30rpx auto;
}
</style>
