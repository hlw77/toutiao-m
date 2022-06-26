<template>
  <div class="login-container">
    <!-- 导航栏S  -->
    <van-nav-bar title="登录">
      <van-icon name="cross" slot="left" />
    </van-nav-bar>
    <!-- 导航栏E  -->
    <!-- 表单S  -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        center
        v-model.trim="mobile"
        :rules="[
          { required: true, message: '请输入手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
            message: '不符合手机的格式',
          },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        center
        v-model.trim="code"
        :rules="[
          { required: true, message: '请输入验证码' },
          {
            pattern: /^\d{6}$/,
            message: '验证码长度必须是6位',
          },
        ]"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            :time="time"
            v-if="isCountDownShow"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            @click="onSendSms"
            size="small"
            type="primary"
            native-type="button"
            v-else
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 表单E  -->
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/login'
export default {
  data () {
    return {
      mobile: '',
      code: '',
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    // 用户登录注册
    async onSubmit (value) {
      // console.log('submit', value)
      // const user = this.user
      try {
        const res = await login(value)
        this.$store.commit('setUser', res.data.data)
      } catch (err) {
        console.log(err)
      }
    },
    // 验证码校验
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        console.log('校验通过')
        this.isCountDownShow = true // 显示倒计时
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败请重试')
        }
      } catch (err) {
        console.log(err)
        console.log('校验失败')
        // Toast.fail('手机格式不对')
        this.$toast.fail('手机格式不对')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.toutiao {
  font-size: 40px;
  color: #666;
  margin-right: 39px;
}
.van-button--info {
  background-color: #6db4fb;
  border: 0;
}

.van-button--primary {
  // position: fixed;
  // right: 10px;
  bottom: 20px;
  width: 152px;
  height: 46px;
  // line-height: 46px;
  background-color: #ededed;
  border: 0;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
// .van-count-down {
//   position: fixed;
//   right: 18px;
//   bottom: 20px;
// }
</style>
