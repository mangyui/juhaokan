<template>
  <div>
    <scroll-view :style="{'height': sHeight+'px'}" :scroll-y="true" :scroll-top="scrollTop" @scrolltolower="getMore" @scroll="onSroll">
      <div class="joke-box">
        <div v-if="item.thumbnail" class="joke-item" v-for="(item,index) in jokes" :key="item.thumbnail">
          <div class="joke-item-author"><img :src="index<maxIndex?item.header:''" @click="toPreview(item.header)"><span>{{item.name}}</span></div>
          <p>{{item.text}}</p>
          <div class="joke-item-img">
            <img :src="index<maxIndex?item.thumbnail:''" mode="aspectFit" :lazy-load="true"  @error="errorFunction(index)"  @click="toPreview(item.images)">
            <span>GIF</span>
          </div>
          <div class="joke-item-comment" v-show="item.top_comments_content">
            <span><van-icon name="fire" size="1em"/>&nbsp;神评：</span>
            <p>{{item.top_comments_content}}</p>
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
      jokes: [],
      maxIndex: 2,
      page: 1,
      getParameters: {
        type: 'gif',
        count: 20
      }
    }
  },
  methods: {
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
      this.getJokes(1)
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
    errorFunction (index) {
      if (this.jokes[index].thumbnail !== this.jokes[index].images) {
        this.jokes[index].thumbnail = this.jokes[index].images
      } else {
        this.jokes.splice(index, 1)
      }
    },
    toPreview (img) {
      wx.previewImage({
        // current: '', // 当前显示图片的http链接
        urls: [img] // 需要预览的图片http链接列表
      })
    },
    getJokes (index) {
      this.page = index
      this.$toPost.getJokes(this.getParameters)
        .then((response) => {
          if (index === 1) {
            this.jokes = response.data.result
          } else {
            this.jokes = this.jokes.concat(response.data.result)
          }
          if (response.data.result.length < this.getParameters.count) {
            this.Loading = false
          }
          // console.log(this.jokes)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getMore () {
      if (this.Loading === true) {
        this.getJokes(this.page + 1)
      }
    }
  },
  beforeMount () {
    this.getJokes(1)
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.joke-box{
  .joke-item{
    padding: 20px 15px;
    border-bottom: 5px solid #f8f8f8;
    .joke-item-author{
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
      span{
        font-size: 0.8em;
        color: #444;
      }
    }
    p {
      line-height: 1.5em;
      padding: 2px 0;
    }
    .joke-item-img{
      position: relative;
      img{
        width: 100%;
        height: 200px;
        margin: 10px 0;
        border-radius: 4px;
      }
      span{
        position: absolute;
        right: 5px;
        bottom: 20px;
        border-radius: 5px;
        padding: 2px 8px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 0.6em;
      }
    }
    .joke-item-comment{
      background-color: #f5f5f5;
      border-radius: 5px;
      padding: 10px;
      span{
        color: #f60;
        font-size: 0.8em;
      }
      p{
        color: #333;
        margin-top: 5px;
      }
    }
  }
}
</style>
