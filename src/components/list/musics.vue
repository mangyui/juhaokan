<template>
  <div>
    <scroll-view :style="{'height': wheight+'px'}" :scroll-y="true">
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
    </scroll-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['songId', 'isPlay'])
  },
  data () {
    return {
      wheight: 675,
      musics: [],
      text: ''
    }
  },
  methods: {
    getMusic (event) {
      this.text = event.mp.detail
      this.$toget.getMusics({name: this.text})
        .then((response) => {
          this.musics = response.data.result
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
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
