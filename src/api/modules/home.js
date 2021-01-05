import http from '../http'
import moment from 'moment'
import MockJS from 'mockjs'
const beginDay = new Date().getTime()

const HomeUnusualEventTrend = () => {
  return new Promise((resolve, reject) => {
    let data = []
    for (let i = 0; i < 20; i++) {
      data.push({
        time: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        value: Math.floor(Math.random() * 100) + 10
      })
    }
    resolve({
      code: 200,
      data
    })
  })
}

const HomeActivedUser = () => {
  return new Promise((resolve, reject) => {
    let result = MockJS.mock({
      'code': 200,
      'data|40': [{
        'id|+1': 1,
        'name|1': ['@name', '@cname'],
        'userType|1': ['实习生', '试用期', '已转正', '离职', '管理层'],
        'activeNum': '@integer(100, 200)'
      }]
    })
    resolve(result)
  })
}

export default {
  HomeUnusualEventTrend, // 异常事件
  HomeActivedUser // 活跃用户
}