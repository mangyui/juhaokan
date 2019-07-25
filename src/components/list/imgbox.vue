<template>
  <div>
    <scroll-view :style="{'height': wheight+'px'}" :scroll-y="true"  @scroll="onscoll">
      <div class="music-box">
        <div class="music-item" v-for="(item,index) in imgs" :key="item">
          <div class="music-item-left">
            <img :src="item.img">
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>

export default {
  data () {
    return {
      imgs: [],
      wheight: 675,
      getParameters: {
        page: 1,
        count: 20
      }
    }
  },
  methods: {
    onscoll (event) {
      console.log(event.mp.detail.scrollTop)
    },
    getImages (index) {
      this.getParameters.page = index
      this.$toPost.getImages(this.getParameters)
        .then((response) => {
          if (index === 1) {
            this.imgs = response.data.result
          } else {
            this.imgs = this.imgs.concat(response.data.result)
          }
          console.log(this.imgs)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  beforeMount () {
    this.getImages(1)
  },
  created () {
    this.wheight = wx.getSystemInfoSync().windowHeight - 169
  }
}
</script>

<style lang="less" scoped>
.music-box{
  padding: 10px;
  .music-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 7px;
    .music-item-left{
      display: flex;
      padding-right: 10px;
      img{
        width: 60px;
        height: 60px;
        border-radius: 4px;
        margin-right: 10px;
      }
      b{
        font-size: 1em;
      }
      p{
        font-size: 0.9em;
        color: #777;
        margin-top: 5px;
      }
    }
  }
}
</style>
