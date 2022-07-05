import request from '@/utils/request'
// import store from '@/store'
// 获取短信验证码
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

// 用户登录功能
export const login = ({ mobile, code }) => {
  return request({
    url: 'authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    url: 'user'
    // headers: {
    //   Authorization: `Bearer+ ${store.state.user.token}`
    // }
  })
}
