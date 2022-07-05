import request from '@/utils/request.js'
// 获取用户频道列表
export const getChannels = () => {
  return request({
    url: 'user/channels'
  })
}
// 频道新闻推荐
export const getArticles = (params) => {
  return request({
    url: 'articles',
    params
  })
}
// 获取全部频道
export const getAllChannels = () => {
  return request({
    url: 'channels'
  })
}
// 添加频道功能持久化
export const addChannels = (channels) => {
  return request({
    method: 'PATCH',
    url: 'user/channels',
    data: {
      channels: [channels]
    }
  })
}
// 删除频道功能持久化
export const removeChannels = (target) => {
  return request({
    method: 'DELETE',
    url: 'user/channels/' + target

  })
}
