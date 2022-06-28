<template>
  <div>
    <router-view class="main" />
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >首页
        <!-- <i slot="icon" class="toutiao toutiao-shouye"></i> -->
        <MyIcon name="shouye" slot="icon"></MyIcon>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/video" icon="search">
        视频
        <i slot="icon" class="toutiao toutiao-shipin"></i
      ></van-tabbar-item>
      <van-tabbar-item replace to="/layout/question" icon="search"
        >问答
        <i slot="icon" class="toutiao toutiao-wenda"></i>
      </van-tabbar-item>
      <van-tabbar-item replace to="/layout/my" icon="search"
        >{{ this.$store.state.user ? "我的" : "未登录" }}
        <i slot="icon" class="toutiao toutiao-wode"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped  lang="less">
.toutiao {
  font-size: 40px;
}
/deep/ .van-tabbar-item__text {
  font-size: 20px;
}
.main {
  padding-bottom: 100px;
  background-color: #f5f7f9;
}
</style>
