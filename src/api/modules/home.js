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
        'userType|1': ['intern', 'probation', 'regular', 'quit', 'manager'],
        'activeNum': '@integer(100, 200)'
      }]
    })
    resolve(result)
  })
}

const HomeLastAnomaly = () => {
  return new Promise((resolve, reject) => {
    let result = MockJS.mock({
      'code': 200,
      'data|9': [{
        'time': '@datetime',
        'desc|1': ['@title(10)', '@title(3)', '@title(7)']
      }]
    })
    resolve(result)
  })
}

const HomeRiskAssetTop = () => {
  return new Promise((resolve, reject) => {
    let result = MockJS.mock({
      'code': 200,
      'data|8': [{
        'name': '@ip',
        'value': '@integer(100, 2000)',
        'total': 2000
      }]
    })
    resolve(result)
  })
}

const HomeRiskEventTop = () => {
  return new Promise((resolve, reject) => {
    let result = MockJS.mock({
      'code': 200,
      'data|10': [{
        'name|1': ['@title(2)', '@title(3)'],
        'value': '@integer(100, 2000)',
        'total': 2000
      }]
    })
    resolve(result)
  })
}

const HomeRiskUserTop = () => {
  return new Promise((resolve, reject) => {
    let result = MockJS.mock({
      'code': 200,
      'data|9': [{
        'name|1': ['@name', '@cname'],
        'score': '@integer(1000, 20000)',
        'RiskEvent': '@integer(10, 200)',
        'ip': '@ip',
        'region': '@city()',
        'gender|1': [0, 1],
        'userType|1': ['intern', 'probation', 'regular', 'quit', 'manager'],
        'photo|1': ['https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg', 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg', 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'],
        'total': 2000
      }]
    })
    resolve(result)
  })
}

//eslint-disable-next-line
export default {
  HomeUnusualEventTrend, // 异常事件
  HomeActivedUser, // 活跃用户
  HomeLastAnomaly, // 最新风险事件
  HomeRiskAssetTop, // 高危资产
  HomeRiskEventTop, // 风险事件
  HomeRiskUserTop, // 高危用户
}
