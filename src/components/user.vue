<template>
  <div class="user-warp">
    <div class="user-bg">
      <div class="bg-mask" :style="{backgroundImage: 'url('+user.avatarUrl+')'}"></div>
    </div>
    <div class="user-box">
      <img :src="user.avatarUrl">
      <div>
        <b>{{user.nickName}}</b>
        <p>{{user.gender==1?'男':'女'}} &nbsp;&nbsp;{{user.province}}&nbsp;&nbsp; {{user.city}}</p>
      </div>
    </div>
    <div>
      <van-cell-group title=" ">
        <van-cell icon="like" title="我的收藏" is-link />
      </van-cell-group>
      <van-cell-group title=" ">
        <van-cell icon="todo-list" title="登录日志" is-link link-type="navigateTo"
          url="/pages/log/main"/>
        <van-cell icon="map-marked" title="我的位置" is-link @click="openLocation"/>
      </van-cell-group>
      <van-cell-group title=" ">
        <van-cell title="设备电量" :value="eleQuantity" />
        <van-cell title="屏幕亮度" :value="Brightness" is-link link-type="navigateTo"
          url="/pages/brightness/main"/>
      </van-cell-group>
      <van-cell-group title=" ">
        <van-cell icon="scan" title="扫码" is-link @click="openScan"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['user'])
  },
  data () {
    return {
      eleQuantity: '100%',
      Brightness: 1
    }
  },
  methods: {
    openLocation () {
      wx.getLocation({
        type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
        success (res) {
          const latitude = res.latitude
          const longitude = res.longitude
          // console.log(latitude, latitude)
          wx.openLocation({
            latitude,
            longitude,
            scale: 18
          })
        }
      })
    },
    openScan () {
      wx.scanCode()
    },
    getPhone () {
      let that = this
      wx.getBatteryInfo({
        success (res) {
          that.eleQuantity = res.level + '%'
        }
      })
      wx.getScreenBrightness({
        success (res) {
          that.Brightness = parseInt(res.value * 100) + '%'
        }
      })
    }
  },
  mounted () {
    // console.log(this.user)
  },
  created () {
    this.getPhone()
  },
  onShow () {
    this.getPhone()
  }
}
</script>

<style lang="less" scoped>
.user-warp {
  position: absolute;
  width: 100%;
  min-height: 100%;
  background-color: #f8f8f8;
}
.user-bg{
  width: 100%;
  height: 150px;
  position: relative;
  overflow: hidden;
}
.bg-mask{
  position: absolute;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: 10;
}
.user-box{
  display: flex;
  align-items: center;
  padding: 0 15px;
  margin-top: -40px;
  position: relative;
  z-index: 20;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 5px;
    border: 2px solid #fff;
    box-shadow: 0 3px 10px rgba(0,0,0,0.15);
  }
  b{
    margin: 6px 8px 9px;
    font-weight: bold;
    color: #fff;
    font-size: 1.1em;
  }
  p{
    margin: 12px 10px;
    font-size: 0.8em;
    color: #666;
    text-align: left;
  }
}
</style>
