<template>
  <div>
    <mNav mtitle="登录日志"></mNav>
    <ul class="container log-list">
      <li v-for="(log, index) in logs" :class="{ red: aa }" :key="index" class="log-item">
        <card :text="(index + 1) + ' . ' + log"></card>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'
import mNav from '@/components/small/mNav'

export default {
  components: {
    card,
    mNav
  },
  data () {
    return {
      logs: []
    }
  },
  methods: {
    getlogs () {
      let logs
      if (mpvuePlatform === 'my') {
        logs = mpvue.getStorageSync({key: 'logs'}).data || []
      } else {
        logs = mpvue.getStorageSync('logs') || []
      }
      this.logs = logs.map(log => formatTime(new Date(log)))
    }
  },
  created () {
    this.getlogs()
  }
}
</script>

<style lang="less" scoped>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
.width100{
  width: 100%
}
</style>
