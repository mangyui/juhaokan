import Vue from 'vue'
import App from './App'
import store from './store'
import './api/get.js'
import './api/post.js'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store
const app = new Vue(App)
app.$mount()
