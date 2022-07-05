<template>
  <div class="channel-box">
    <!-- 我的频道 -->
    <div class="channel-my">
      <div class="title">
        <h3>我的频道</h3>
        <van-button type="danger" plain round @click="show = !show">{{
          show ? "完成" : "编辑"
        }}</van-button>
      </div>
      <van-grid :gutter="10" :border="false">
        <van-grid-item
          v-for="(channel, index) in myChannels"
          :key="index"
          @click="triggerFn(channel, index)"
        >
          <template #text>
            <span
              class="text"
              :style="{ color: active === index ? 'red' : '#000' }"
            >
              {{ channel.name }}</span
            >
          </template>
          <template #icon>
            <van-icon
              name="close"
              v-show="show"
              v-if="channel.id !== 0"
              :style="{ color: active === index ? 'red' : '#000' }"
            />
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 频道推荐 -->
    <div class="channel-recommend">
      <div class="title">
        <h3>频道推荐</h3>
      </div>
      <van-grid :gutter="10">
        <van-grid-item
          v-for="(channel, index) in recommendChannels"
          :key="index"
          @click="addChannelFn(channel)"
        >
          <template #icon>
            <van-icon name="plus" />
          </template>
          <template #text>
            <span class="text"> {{ channel.name }}</span>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAllChannels, addChannels, removeChannels } from '@/api/home'

export default {
  created () {
    this.getAllChannels()
  },
  name: 'channel-edit',
  props: {
    // 1 父传子我的频道数据
    myChannels: {
      type: Array,
      required: true
    },
    // 父传子 active
    active: {
      type: Number,
      required: true
    }

  },
  data () {
    return {
      // 3 存储全部频道数据
      allChannels: [],
      show: false
    }
  },
  methods: {
    // 2 获取全部频道数据
    async getAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast.fail(err.message)
      }
    },
    // 频道切换和删除功能
    async triggerFn (channel, index) {
      if (this.show) {
        // 推荐不能被删除
        if (index === 0) {
          return
        }
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0 // 持续展示 toast
        })
        // 频道删除功能
        this.myChannels.splice(index, 1)
        // 频道删除持久化
        if (this.user) {
          try {
            await removeChannels(channel.id)
            // console.log(res)
            this.$toast.success('删除成功')
          } catch (err) {
            this.$toast.fail(err.message)
          }
        } else {
          window.localStorage.setItem('my-Channel', JSON.stringify(this.myChannels))
          this.$toast.success('删除成功')
        }
      } else {
        // 频道切换功能
        this.$emit('click-event', index)
      }
    },
    // 添加频道功能
    async addChannelFn (channel) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0 // 持续展示 toast
      })
      this.myChannels.push(channel)
      // 添加频道数据持久化
      if (this.user) {
        // 有token请求接口
        try {
          await addChannels({
            id: channel.id,
            seq: this.myChannels.length
          })
          this.$toast.success('添加成功')
        } catch (err) {
          this.$toast.fail(err.message)
        }
      } else {
        // 没有接口存储到本地
        window.localStorage.setItem('my-Channel', JSON.stringify(this.myChannels))
        this.$toast.success('添加成功')
      }
    }
  },
  computed: {
    // 4 推荐频道数据= 全部频道数据 - 我的频道数据
    recommendChannels () {
      return this.allChannels.filter(channel => {
        const result = this.myChannels.some(channel2 => {
          return channel.id === channel2.id
        })
        return !result
      })
    },
    // 从vuex中引入token
    ...mapState(['user'])
  },

  watch: {},
  filters: {},
  components: {

  }
}
</script>

<style scoped lang="less">
.channel-box {
  padding: 109px 20px;
  .title {
    display: flex;
    justify-content: space-between;
    h3 {
      font-size: 32px;
      font-weight: normal;
    }
    .van-button {
      width: 110px;
      height: 48px;
      line-height: 48px;
      .van-button__text {
        font-size: 18px;
      }
    }
  }
  .van-grid {
    margin-top: 48px;
    .van-grid-item {
      width: 160px;
      height: 86px;
      border-radius: 6px;
    }
    /deep/.van-grid-item__content {
      background-color: #f4f5f6;
      .text {
        font-size: 28px;
        white-space: nowrap;
        color: #000;
      }
    }
  }
  .channel-recommend {
    margin-top: 75px;
    /deep/.van-grid-item__content {
      display: flex;
      flex-direction: row;
    }
  }
  .channel-my {
    /deep/.van-grid-item__icon-wrapper {
      position: unset;
      .van-icon {
        font-size: 26px;
        position: absolute;
        right: 0;
        transform: translate(-50%, -80%);
      }
    }
  }
}
</style>
