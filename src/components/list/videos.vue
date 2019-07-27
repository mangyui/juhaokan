<template>
  <div>
    <scroll-view :style="{'height': sHeight+'px'}" :scroll-y="true" :scroll-top="scrollTop" @scrolltolower="getMore" @scroll="onSroll">
      <div class="video-box">
        <div class="video-item" v-for="(item,index) in videos" :key="index">
          <p class="video-title"><span>#{{item.category}}</span>{{item.title}}</p>
          <div class="video-item-img">
            <video  :title="item.title" :id="item.id" :src="index<maxIndex?item.playUrl:''" :poster="index<maxIndex?item.cover:''"/>
          </div>
          <p class="video-content">{{item.description}}</p>
          <div class="video-item-author" v-if="item.author">
            <img :src="index<maxIndex?item.author.icon:''" @click="toPreview(item.author.icon)">
            <span>{{item.author.name}}</span>
            <!-- <span>{{new Date(parseInt(item.data.date)).toLocaleString('chinese', {hour12:false})}}</span> -->
          </div>
        </div>
      </div>
      <div v-show="Loading" class="my-center">
        <van-loading type="spinner" size="20px" color="#f60" />
      </div>
      <div class="blockH"></div>
    </scroll-view>
    <div class="ic-refresh" @click="toRefresh">
      <van-icon name="replay" size="1.5em" color="#00a7ff"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['sHeight'])
  },
  data () {
    return {
      scrollTop: 0,
      Loading: true,
      isPlay: 0,
      videoContext: null,
      videos: [],
      maxIndex: 2,
      videoId: [127398, 146036, 154579, 156167, 157693, 140344, 129839, 113503, 136645, 120640, 115484],
      page: 1,
      getParameters: {
        id: 127398
      }
    }
  },
  methods: {
    // videoPlay (e) {
    //   console.log(e)
    //   var _index = e.currentTarget.id
    //   this.isPlay = _index
    //   // 停止正在播放的视频
    //   var videoContextPrev = wx.createVideoContext(this.isPlay)
    //   videoContextPrev.stop()

    //   setTimeout(() => {
    //   // 将点击视频进行播放
    //     var videoContext = wx.createVideoContext(_index)
    //     videoContext.play()
    //   }, 500)
    // },
    toRefresh () {
      wx.showLoading({
        title: '加载中'
      })
      if (this.scrollTop === 0) {
        this.scrollTop = 0.1
      } else {
        this.scrollTop = 0
      }
      this.Loading = true
      this.maxIndex = 2
      this.getVideos(1)
      setTimeout(() => {
        wx.hideLoading()
      }, 600)
    },
    onSroll (event) {
      let curr = Math.floor(event.mp.detail.scrollTop / 340) + 2
      if (curr > this.maxIndex) {
        this.maxIndex = curr
      }
    },
    toPreview (img) {
      wx.previewImage({
        // current: '', // 当前显示图片的http链接
        urls: [img] // 需要预览的图片http链接列表
      })
    },
    addVideoId (arr) {
      arr.shift()
      let newArr = []
      for (let j = 0, len = arr.length; j < len; j++) {
        if (arr[j].data.id) {
          this.videoId.push(arr[j].data.id)
          let obj = {}
          obj.date = arr[j].data.date
          obj.description = arr[j].data.description
          obj.title = arr[j].data.title
          obj.playUrl = arr[j].data.playUrl
          obj.cover = arr[j].data.cover.feed
          obj.id = arr[j].data.id
          obj.category = arr[j].data.category
          obj.author = {
            icon: arr[j].data.author.icon,
            name: arr[j].data.author.name
          }
          newArr.push(obj)
        }
      }
      if (arr.length < 10) {
        this.Loading = false
      }
      return newArr
    },
    getVideos (index) {
      this.page = index
      this.getParameters.id = this.videoId[Math.floor(Math.random() * (this.videoId.length))]
      this.$toget.getVideos(this.getParameters)
        .then((response) => {
          if (response.data.result.length > 0) {
            let newVideos = this.addVideoId(response.data.result)
            if (index === 1) {
              this.videos = newVideos
            } else {
              this.videos = this.videos.concat(newVideos)
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getMore () {
      if (this.Loading === true) {
        this.getVideos(this.page + 1)
      }
    }
  },
  beforeMount () {
    this.getVideos(1)
  },
  created () {

  }
}
</script>

<style lang="less" scoped>
.video-box{
  .video-item{
    padding: 20px 15px;
    border-bottom: 5px solid #f8f8f8;
    .video-item-author{
      display: flex;
      align-items: center;
      margin-top: 5px;
      img{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span{
        font-size: 0.8em;
        color: #444;
      }
    }
    p.video-title {
      line-height: 1.5em;
      padding: 5px 0;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span{
        border-radius: 5px;
        padding: 6px;
        background-color: rgba(255, 68, 68,0.7);
        color: #fff;
        font-size: 0.7em;
        margin-right: 5px;
      }
    }
    p.video-content{
      line-height: 1.5em;
      padding: 5px 0;
      font-size: 0.9em;
      color: #333;
    }
    .video-item-img{
      position: relative;
      video{
        width: 100%;
        height: 195px;
        margin: 5px 0;
        border-radius: 2px;
      }
    }
  }
}
</style>
