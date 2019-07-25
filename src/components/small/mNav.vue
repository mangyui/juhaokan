<template>
  <div class="my-nav">
    <span v-show="isBorder" @click="onClickLeft"><van-icon name="arrow-left" /></span>
    <b>{{mtitle}}</b>
    <!-- <div  class="my-hr"></div> -->
  </div>
</template>

<script>
export default {
  name: 'mNav',
  props: {
    mtitle: {
      type: String,
      default: ''
    },
    isBorder: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onClickLeft () {
      wx.navigateBack()
    }
  }
}
</script>

<style lang="less" scoped>
.my-nav{
  position: fixed;
  width: 100%;
  padding-top: 25px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  position: relative;
  color: #fefefe;
  background: linear-gradient(to right,#00d9ff,#00a7ff);
  > span{
    position: absolute;
    left: 10px;
    line-height: 55px;
    padding: 0 10px;
    font-size: 1.1em;
    font-weight: bold;
  }
  b{
    font-size: 1.1em;
  }
  .my-hr{
    height: 1px;
    width: 100%;
    background-color: #f8f8f8;
  }
}

</style>
