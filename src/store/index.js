import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import song from './playSong'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...user.state,
    ...song.state
  },
  mutations: {
    ...user.mutations,
    ...song.mutations
  },
  getters: {
    user: state => state.user,
    city: state => state.user.city,
    isPlay: state => state.isPlay,
    songId: state => state.songId
  }
})

export default store
