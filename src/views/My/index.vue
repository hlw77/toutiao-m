<template>
  <div>
    <!-- 以登录 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            :src="userInfo.photo"
            round
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>关注</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- 未登录 -->
    <div class="header header-notlogin" v-else>
      <div class="login-box">
        <img
          src="@/assets/mobile.png"
          alt=""
          @click="$router.push({ name: 'login' })"
        />
        <span>登录 / 注册</span>
      </div>
    </div>
    <!-- 收藏历史 -->
    <van-grid :column-num="2">
      <van-grid-item icon="photo-o" text="收藏">
        <template #icon>
          <i class="toutiao toutiao-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item icon="photo-o" text="历史">
        <template #icon>
          <i class="toutiao toutiao-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <van-button
      type="default"
      block
      class="logout"
      v-if="user && user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/login'
export default {
  name: 'my',
  created () {
    if (this.user.token) {
      this.loadUser()
    }
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '确认退出吗'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {

        })
    },
    // 展示用户信息
    async loadUser () {
      try {
        const res = await getUserInfo()
        // console.log(res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.header {
  width: 750px;
  height: 401px;
  background: rgba(50, 150, 250, 0.8) url("@/assets/banner.png") no-repeat 0 0 /
    cover;
}
//未登录
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    img {
      width: 132px;
      height: 132px;
    }
    span {
      margin-top: 15px;
      font-size: 28px;
      font-weight: normal;
      color: #ffffff;
    }
  }
}
//已登录
.header-login {
  padding-top: 116px;
  .avatar {
    padding-left: 32px;
    padding-right: 33px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 55px;
    .button {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 1px;
      color: #666666;
      text-align: center;
      line-height: 33px;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      font-weight: 400;
      p {
        color: #fff;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
.van-cell-group {
  margin: 9px 0;
}
.logout {
  color: #d86262;
}
</style>
