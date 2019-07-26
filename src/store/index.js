import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import screen from './screen'
import song from './playSong'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...user.state,
    ...screen.state,
    ...song.state
  },
  mutations: {
    ...user.mutations,
    ...screen.mutations,
    ...song.mutations
  },
  getters: {
    user: state => state.user,
    city: state => state.user.city,
    sHeight: state => state.sHeight,
    isPlay: state => state.isPlay,
    songId: state => state.songId
  }
})

export default store
