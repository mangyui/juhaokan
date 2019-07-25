import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import scoll from './scoll'
import song from './playSong'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ...user.state,
    ...scoll.state,
    ...song.state
  },
  mutations: {
    ...user.mutations,
    ...scoll.mutations,
    ...song.mutations
  },
  getters: {
    user: state => state.user,
    city: state => state.user.city,
    stype: state => state.stype,
    isPlay: state => state.isPlay,
    songId: state => state.songId
  }
})

export default store
