import Fly from 'flyio/dist/npm/wx'
import Vue from 'vue'
let fly = new Fly()

const toget = {
  // 获取天气
  getWeather (datas) {
    return fly.request('https://www.apiopen.top/weatherApi', datas, {
      method: 'get'
    })
  },
  // 获取音乐
  getMusics (datas) {
    return fly.request('https://api.apiopen.top/searchMusic', datas, {
      method: 'get'
    })
  },
  // 获取视频
  getVideos (datas) {
    return fly.request('https://api.apiopen.top/videoRecommend', datas, {
      method: 'get'
    })
  }
}

Vue.prototype.$toget = toget
