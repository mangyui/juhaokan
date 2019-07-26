<template>
  <div>
    <mNav mtitle="聚好看" :isBorder="false"></mNav>
    <div class="list-top">
      <van-tabs class="mc-tab" :active="activeType" swipeable @change="onChange">
        <van-tab title="视频"><videosBox></videosBox></van-tab>
        <van-tab title="图片"><imagesBox></imagesBox></van-tab>
        <van-tab title="音乐"><musicsBox></musicsBox></van-tab>
        <van-tab title="段子"><jokeBox></jokeBox></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import mNav from '@/components/small/mNav'
import videosBox from './videos'
import imagesBox from './images'
import musicsBox from './musics'
import jokeBox from './jokes'

export default {
  components: {
    mNav,
    videosBox,
    imagesBox,
    musicsBox,
    jokeBox
  },
  data () {
    return {
      activeType: 0
    }
  },
  methods: {
    onChange (event) {
      this.activeType = event.mp.detail.index
      this.$store.commit('updateHeigth', wx.getSystemInfoSync().windowHeight - 165)
    }
  },
  beforeMount () {
    this.$store.commit('updateHeigth', wx.getSystemInfoSync().windowHeight - 165)
  }
}
</script>

<style lang="less">
.list-top{
  padding: 0 0 45px;
}
</style>

