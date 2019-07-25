export default {
  state: {
    // sheight: [0, 0, 0, 0],
    stype: 0
  },
  mutations: {
    // updateHeight (state, height) {
    //   state.sheight[state.stype] = height
    // },
    updateType (state, type) {
      state.stype = type
    }
  }
}
