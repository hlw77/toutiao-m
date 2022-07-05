<template>
  <div class="box">
    <!--导航栏 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button type="info" icon="search" class="search">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- tab栏 -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab :title="item.name" v-for="item in ChannelsArr" :key="item.id">
        <MyList :obj="item"></MyList>
      </van-tab>
      <template #nav-right>
        <div class="main1"></div>
        <div class="hamburger-btn" @click="show = true">
          <i class="toutiao toutiao-gengduo"> </i>
        </div>
      </template>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <ChannelEdit
        :myChannels="ChannelsArr"
        :active="active"
        @click-event="clickFn"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getChannels } from '@/api/home'
import MyList from '@/components/MyList.vue'
import ChannelEdit from '@/components/channel-edit.vue'
export default {
  name: 'home',
  created () {
    this.getChannels()
  },
  data () {
    return {
      active: 0,
      ChannelsArr: [],
      // 控制弹出层
      show: true
    }
  },
  methods: {
    async getChannels () {
      try {
        // 如果用户未登录并且本地存储里有数据 使用本地存储数据
        const bdChannels = JSON.parse(window.localStorage.getItem('my-Channel'))
        // 这里注意一定要取反
        if (!this.$store.state.user && bdChannels) {
          this.ChannelsArr = bdChannels
          return
        }
        const res = await getChannels()
        this.ChannelsArr = res.data.data.channels
        // console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    clickFn (index) {
      this.active = index
      this.show = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    MyList,
    ChannelEdit
  }
}
</script>

<style scoped lang="less">
.box {
  padding-top: 180px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
  .search {
    width: 555px;
    height: 64px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 32px;
    border: 0;
  }
}
/deep/.van-tabs__wrap {
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 92px;
  border-bottom: 1px solid #edeff3;

  .van-tab {
    width: 200px;
    height: 80px;
    border-right: 1px solid #edeff3;

    .van-tab__text {
      font-size: 30px;
    }
  }
  .van-tab--active {
    color: #333;
  }
  .van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3296fa;
    margin-bottom: 8px;
  }
  .main1 {
    flex-shrink: 0;
    width: 50px;
    height: 82px;
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: rgba(255, 255, 255, 0.9);
    &::after {
      content: "";
      position: absolute;
      left: 0;
      width: 2px;
      height: 100%;
      background: url("@/assets/gradient-gray-line.png");
      background-size: contain;
    }
    i {
      font-size: 33px;
      color: #333;
    }
  }
}
</style>
