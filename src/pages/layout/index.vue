<template>
  <div id="content">
    <div class="content-page" v-show="page==0">
      <Chome></Chome>
    </div>
    <div v-show="page==1">
      <Clist></Clist>
    </div>
    <div v-show="page==2">
      <Cuser></Cuser>
    </div>
    <van-tabbar active-color="#13227a" :active="page" @change="onChange">
      <van-tabbar-item v-for="item in tabbars" :key="item">
        <image slot="icon" :src="item.normal" mode="aspectFit"/>
        <image slot="icon-active" :src="item.active" mode="aspectFit"/>
        {{item.title}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Chome from '@/components/home'
import Clist from '@/components/list/index.vue'
import Cuser from '@/components/user'

export default {
  components: {
    Chome,
    Clist,
    Cuser
  },

  data () {
    return {
      page: 1,
      scollheight: [0, 0, 0],
      tabbars: [{
        title: '主页',
        normal: '/static/tabs/ic-home.png',
        active: '/static/tabs/ic-home-active.png'
      }, {
        title: '聚好看',
        normal: '/static/tabs/ic-more.png',
        active: '/static/tabs/ic-more-active.png'
      }, {
        title: '我的',
        normal: '/static/tabs/ic-user.png',
        active: '/static/tabs/ic-user-active.png'
      }]

    }
  },
  onPageScroll (e) { // 这个就是滚动到的位置,可以用这个位置来写判断
    this.scollheight[this.page] = e.scrollTop
  },
  methods: {
    onChange (event) {
      this.page = event.mp.detail
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: this.scollheight[this.page],
          duration: 0
        })
      }, 0)
    }
  },
  created () {
  }
}
</script>

<style>
page{
  background-color: #fff;
}
.width100{
  width: 100%
}
.content-page{
  margin-bottom: 50px;
}
</style>
