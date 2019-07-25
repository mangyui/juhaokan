<template>
  <div>
    <mNav mtitle="屏幕亮度"></mNav>
    <div class="slider-box">
      <van-slider
        :value="Brightness"
        bar-height="4px"
        active-color="#f44"
        @change="onChange"
      />
    </div>
  </div>
</template>

<script>
import mNav from '@/components/small/mNav'

export default {
  components: {
    mNav
  },

  data () {
    return {
      Brightness: 50
    }
  },
  methods: {
    onChange (event) {
      wx.setScreenBrightness({
        value: (event.mp.detail / 100)
      })
      wx.showToast({
        icon: 'none',
        title: `当前值：${event.mp.detail}`
      })
      wx.getScreenBrightness({
        success (res) {
        }
      })
    },
    getPhone () {
      let that = this
      wx.getScreenBrightness({
        success (res) {
          that.Brightness = res.value * 100
        }
      })
    }
  },
  onShow () {
    this.getPhone()
  }
}
</script>

<style lang="less" scoped>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
.width100{
  width: 100%
}
.slider-box{
  padding: 50px 20px;
}
</style>
