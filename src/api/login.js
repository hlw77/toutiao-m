import request from '@/utils/request'

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
