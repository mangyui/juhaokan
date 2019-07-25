<template>
  <div>
    <swiper v-if="imgUrls.length > 0" :indicator-dots="true" indicator-color="rgba(255, 255, 255, .3)" indicator-active-color="#ccc" :autoplay="true" >
      <swiper-item  v-for="(item, index) in imgUrls" :key="index">
        <image class="width100" :src="item" mode="scaleToFill"></image>
      </swiper-item>
    </swiper>
    <div v-if="weather">
      <van-notice-bar v-show="weather.ganmao" :text="weather.ganmao"/>
      <div class="wea-today-box">
        <b>{{weather.wendu}}℃</b>
        <span>{{today.type}}</span>
        <p v-if="today.high">{{today.high }} / {{ today.low }}</p>
        <i>{{today.fengxiang}}</i>
        <div>
          <h3>{{weather.city}}</h3>
          <h4>{{today.date}}</h4>
        </div>
      </div>
      <div class="wea-other">
        <div class="wea-other-item">
          <span>{{yesterday.date}}</span>
          <i>{{yesterday.type}}</i>
          <b>{{yesterday.high}} / {{yesterday.low}}</b>
        </div>
        <div class="wea-other-item" v-for="item in weather.forecast" :key="item">
          <span>{{item.date}}</span>
          <i>{{item.type}}</i>
          <b>{{item.high}} / {{item.low}}</b>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import card from '@/components/card'

export default {
  components: {
    card
  },
  data () {
    return {
      text: '',
      city: this.$store.getters.city,
      today: '',
      yesterday: '',
      weather: '',
      imgUrls: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ]
    }
  },
  // filters: {
  //   mydelete2: function (val) {
  //     let vals = val.substring(2)
  //     return vals
  //   }
  // },
  methods: {
    getWeather () {
      this.$toget.getWeather({ city: this.city })
        .then((response) => {
          this.text = response.data.msg
          this.weather = response.data.data
          this.today = response.data.data.forecast[0]
          this.yesterday = response.data.data.yesterday
          this.mydelete2(this.yesterday)
          for (let i = 0; i < this.weather.forecast.length; i++) {
            this.mydelete2(this.weather.forecast[i])
          }
          this.myadd2()
          // console.log(this.weather)
        })
        .catch((error) => {
          this.text = error
          console.log(error)
        })
    },
    mydelete2 (obj) {
      obj.high = obj.high.substring(2)
      obj.low = obj.low.substring(2)
    },
    myadd2 () {
      this.weather.forecast[0].date = '今天' + this.weather.forecast[0].date.substring(3)
      this.yesterday.date = '昨天' + this.yesterday.date.substring(3)
    }
  },
  created () {
    this.getWeather()
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
.wea-today-box{
  display: flex;
  text-align: center;
  flex-flow: column;
  padding: 20px;
  position: relative;
  color: #888;
  b{
    font-size: 3em;
    color: #13227a;
    font-weight: bold;
    margin-bottom: 5px;
  }
  p{
    margin: 8px;
    color: #555;
    font-size: 0.9em;
  }
  i{
    font-size: 0.8em;
  }
  div{
    position: absolute;
    top: 20px;
    left: 15px;
    text-align: left;
    h3{
      font-size: 1.2em;
      margin-bottom: 8px;
      color: #13227a;
    }
    h4{
      font-size: 0.8em;
      color: #666;
    }
  }
}
.wea-other{
  padding: 10px 20px 10px;
}
.wea-other-item{
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #f9f9f9;
  height: 45px;
  line-height: 45px;
  align-items: center;
  color: #666;
  font-size: 0.8em;
}
</style>
