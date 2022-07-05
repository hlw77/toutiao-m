<template>
  <div class="myList">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="successText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
        <ActicleItem
          v-for="(item, index) in list"
          :key="index"
          :obj="item"
        ></ActicleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/home'
import ActicleItem from '@/components/article-item'
export default {
  name: 'myList',
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      successText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getArticles({
          channel_id: this.obj.id,
          //  timestamp简单理解  请求数据的页码
          // 请求第一页数据：当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: this.timestamp || Date.now(),
          with_top: 0
        })
        // console.log(data)
        // 测试
        // if (Math.random() > 0.5) {
        //   this.error = true
        //   this.loading = false
        // }
        const { results } = data.data
        this.list.push(...results)
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成

        if (results.length === 0) {
          this.finished = true
        } else {
          this.timestamp = data.data.pre_timestamp
        }
      } catch (err) {
        console.log('请求加载失败' + err)
      }
    },
    // 刷新功能
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.obj.id,
          //  timestamp简单理解  请求数据的页码
          // 请求第一页数据：当前最新时间戳
          // 用于请求之后数据的时间戳会在当前请求结果中返回给你
          timestamp: Date.now(),
          with_top: 0
        })
        // 测试
        // if (Math.random() > 0.5) {
        //   JSON.parse('dasdsad')
        // }
        const { results } = data.data
        this.list.unshift(...results)
        this.successText = `刷新成功，刷新了${results.length}条数据`
        this.isLoading = false
      } catch (err) {
        this.successText = '刷新失败'
        this.isLoading = false
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ActicleItem
  }
}
</script>

<style scoped>
.myList {
  /* 注意这里要用到vh 相对于Html 用100%相对于父亲 但是父亲高度是0 不好操作 */
  height: 79vh;
  overflow: auto;
}
</style>
