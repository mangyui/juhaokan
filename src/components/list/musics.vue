<template>
  <div>
    <scroll-view :style="{'height': sHeight+'px'}" :scroll-y="true">
      <van-search
        :value="text"
        placeholder="搜索音乐"
        @search="getMusic"
      />

      <div class="music-box">
        <div class="music-item" v-for="(item,index) in musics" :key="item.songid" @click="playOrpause(item)">
          <div class="music-item-left">
            <img :src="item.pic">
            <div>
              <b>{{item.title}}</b>
              <p>{{item.author}}</p>
            </div>
          </div>
          <div class="music-item-right">
            <div v-if="isPlay!=0&&songId==item.songid">
              <van-icon v-if="isPlay==1" name="pause-circle" size="2em" color="#00a7ff"/>
              <van-icon v-else name="play-circle" size="2em" color="#ccc"/>
            </div>
          </div>
        </div>
      </div>
      <div v-show="Loading" class="my-center">
        <van-loading  type="spinner" size="20px" color="#f60" />
      </div>
      <div class="blockH"></div>
    </scroll-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['songId', 'isPlay', 'sHeight'])
  },
  data () {
    return {
      Loading: false,
      musics: [],
      text: ''
    }
  },
  methods: {
    getMusic (event) {
      this.text = event.mp.detail
      if (this.text.trim() !== '') {
        this.Loading = true
        this.$toget.getMusics({name: this.text})
          .then((response) => {
            this.musics = response.data.result
            console.log(response)
            this.Loading = false
          })
          .catch((error) => {
            console.log(error)
            this.Loading = false
          })
      }
    },
    playOrpause (song) {
      if (this.isPlay !== 1 || song.songid !== this.songId) {
        wx.playBackgroundAudio({
          dataUrl: song.url,
          title: song.title,
          coverImgUrl: song.pic
        })
        this.$store.commit('updateSongid', song.songid)
      } else {
        wx.pauseBackgroundAudio()
      }
    }
  },
  beforeMount () {
    wx.onBackgroundAudioPlay(() => {
      this.$store.commit('updatePlay', 1)
    })
    wx.onBackgroundAudioPause(() => {
      this.$store.commit('updatePlay', 2)
    })
    wx.onBackgroundAudioStop(() => {
      this.$store.commit('updatePlay', 0)
    })
  },
  created () {
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
    overflow: hidden;
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p{
        font-size: 0.9em;
        color: #777;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
