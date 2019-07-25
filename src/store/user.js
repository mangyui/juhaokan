export default {
  state: {
    user: wx.getStorageSync('user') || {}
  },
  mutations: {
    initUserInfo (state, user) {
      state.user = user
      wx.setStorage({
        key: 'user',
        data: user
      })
    },
    logoutUser (state, user) {
      state.user = {}
      wx.removeStorageSync('user')
    }
  }
}
