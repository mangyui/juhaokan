import Fly from 'flyio/dist/npm/wx'
import Vue from 'vue'
import qs from 'qs'
let fly = new Fly()

const toPost = {
  // 获取图片
  getImages (datas) {
    return fly.request('https://api.apiopen.top/getImages', qs.stringify(datas), {
      method: 'post'
    })
  }
}

Vue.prototype.$toPost = toPost
