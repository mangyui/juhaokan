export default {
  state: {
    isPlay: 0, // 0停止 1播放 2暂停
    songId: 0
  },
  mutations: {
    updatePlay (state, play) {
      state.isPlay = play
    },
    updateSongid (state, songid) {
      state.songId = songid
    }
  }
}
