<template>
  <div>
    <scroll-view :style="{'height': sHeight+'px'}" :scroll-y="true" @scrolltolower="getMore" @scroll="onSroll">
      <div class="imgs-box">
        <div class="imgs-item" v-for="(item, index) in imgs" :key="item">
          <img :src="index<maxIndex?item.img:''" :lazy-load="true" mode="aspectFill" @click="toPreview(item)" @error="errorFunction(index)"/>
          <span><van-button size="small" type="danger">收藏</van-button></span>
        </div>
      </div>
      <div class="my-center">
        <van-loading v-show="true" type="spinner" size="20px" color="#f60" />
      </div>
    </scroll-view>
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
      imgs: [],
      page: 1,
      maxIndex: 6,
      getParameters: {
        count: 20
      }
    }
  },
  // computed: {
  //   isFollow () {
  //     return this.$store.state.stype // 需要监听的数据
  //   }
  // },
  // watch: {
  //   isFollow (newVal, oldVal) {
  //     if (newVal === 1) {
  //       this.scrollTop = this.scrollT + 0.1
  //     }
  //   }
  // },
  methods: {
    onSroll (event) {
      let curr = Math.floor(event.mp.detail.scrollTop / 250) * 2 + 6
      if (curr > this.maxIndex) {
        this.maxIndex = curr
      }
    },
    errorFunction (index) {
      this.imgs.splice(index, 1)
    },
    toPreview (imgObj) {
      wx.previewImage({
        // current: '', // 当前显示图片的http链接
        urls: [imgObj.img] // 需要预览的图片http链接列表
      })
    },
    getImages (index) {
      this.page = index
      this.$toPost.getImages(this.getParameters)
        .then((response) => {
          if (index === 1) {
            this.imgs = response.data.result
          } else {
            this.imgs = this.imgs.concat(response.data.result)
          }
          // console.log(this.imgs)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getMore () {
      this.getImages(this.page + 1)
    }
  },
  beforeMount () {
    this.getImages(1)
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.imgs-box{
  padding: 5px 0;
  width: 100%;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .imgs-item {
    width: 48%;
    background: #fefefe;
    padding: 2px;
    transition: opacity .4s ease-in-out; // 检索或设置对象变换时的过渡
    display: inline-block;
    position: relative;
    img{
      width: 100%;
      border-radius: 3px;
    }
    span{
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
}
</style>
