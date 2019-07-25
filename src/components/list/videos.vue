<template>
  <div>
    <scroll-view :style="{'height': wheight+'px'}" :scroll-y="true"  @scrolltolower="getMore">
      <div class="video-box">
        <div class="video-item" v-for="(item,index) in videos" :key="index">
          <p class="video-title"><span>#{{item.data.category}}</span>{{item.data.title}}</p>
          <div class="video-item-img">
            <video :title="item.data.title" :id="item.data.id" :src="item.data.playUrl" :poster="item.data.cover.feed"/>
          </div>
          <p class="video-content">{{item.data.description}}</p>
          <div class="video-item-author" v-if="item.data.author">
            <img :src="item.data.author.icon" @click="toPreview(item.data.author.icon)">
            <span>{{item.data.author.name}}</span>
            <!-- <span>{{new Date(parseInt(item.data.date)).toLocaleString('chinese', {hour12:false})}}</span> -->
          </div>
        </div>
      </div>
      <div class="my-center">
        <van-loading v-show="true" type="spinner" size="20px" color="#f60" />
      </div>
    </scroll-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
      isPlay: 0,
      videoContext: null,
      videos: [],
      videoId: [127398, 146036, 154579, 156167, 157693, 140344, 129839, 113503, 136645, 120640, 115484],
      wheight: 675,
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
    toPreview (img) {
      wx.previewImage({
        // current: '', // 当前显示图片的http链接
        urls: [img] // 需要预览的图片http链接列表
      })
    },
    addVideoId (arr) {
      for (let j = 0, len = arr.length; j < len; j++) {
        if (arr[j].data.id) {
          this.videoId.push(arr[j].data.id)
        }
      }
    },
    getVideos (index) {
      this.page = index
      this.getParameters.id = this.videoId[Math.floor(Math.random() * (this.videoId.length))]
      this.$toget.getVideos(this.getParameters)
        .then((response) => {
          if (response.data.result.length > 0) {
            response.data.result.shift()
          }
          if (index === 1) {
            this.videos = response.data.result
          } else {
            this.videos = this.videos.concat(response.data.result)
          }
          this.addVideoId(response.data.result)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getMore () {
      this.getVideos(this.page + 1)
    }
  },
  beforeMount () {
    this.getVideos(1)
  },
  created () {
    this.wheight = wx.getSystemInfoSync().windowHeight - 169
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
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span{
        border-radius: 5px;
        padding: 1px 6px;
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
