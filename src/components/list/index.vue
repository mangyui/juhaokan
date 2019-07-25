<template>
  <div>
    <mNav mtitle="聚好看" :isBorder="false"></mNav>
    <div class="list-top">
      <van-tabs class="mc-tab" :active="activeType" swipeable @change="onChange">
        <van-tab title="新闻">内容 1</van-tab>
        <van-tab title="图片"><imagesBox></imagesBox></van-tab>
        <van-tab title="音乐"><musicsBox></musicsBox></van-tab>
        <van-tab title="段子"><imgBox></imgBox></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import mNav from '@/components/small/mNav'
import imagesBox from './images'
import musicsBox from './musics'
import imgBox from './imgbox'

export default {
  components: {
    mNav,
    imagesBox,
    musicsBox,
    imgBox
  },
  data () {
    return {
      activeType: 1
    }
  },
  methods: {
    onChange (event) {
      this.activeType = event.mp.detail.index
      this.$store.commit('updateType', event.mp.detail.index)
    }
  },
  beforeMount () {

  }
}
</script>

<style lang="less">
.list-top{
  padding: 0;
}
</style>

