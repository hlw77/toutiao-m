<template>
  <van-cell>
    <template #title>
      <div class="title van-multi-ellipsis--l2">{{ obj.title }}</div>
    </template>
    <template #label>
      <!-- 三张图片 -->
      <div v-if="obj.cover.type === 3" class="cover-wrap">
        <div
          v-for="(imgs, index) in obj.cover.images"
          :key="index"
          class="cover-item"
        >
          <van-image width="100" height="100" :src="imgs" />
        </div>
      </div>
      <div class="tags">
        <span>{{ obj.aut_name }}</span>
        <span>{{ obj.comm_count + "评论" }}</span>
        <span>{{ obj.pubdate | relativeTime }}</span>
      </div>
    </template>
    <template #default>
      <div v-if="obj.cover.type === 1">
        <img :src="obj.cover.images[0]" alt="" />
      </div>
    </template>
  </van-cell>
</template>

<script >
export default {
  name: 'ActicleItem',
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.title {
  font-size: 33px;
  color: #3a3a3a;
}
.van-cell__value {
  width: 232px;
  height: 146px;
  flex: unset;
  padding-left: 25px;
}
.tags {
  margin-top: 43px;
  span {
    font-size: 23px;
    color: #999999;
    padding-right: 25px;
  }
}
.cover-wrap {
  display: flex;
  padding: 30px 0;
  .cover-item {
    width: 232px;
    height: 146px;
    &:not(:last-child) {
      margin-right: 4px;
    }
    /deep/.van-image__img {
      width: 232px;
      height: 146px;
    }
  }
}
</style>
