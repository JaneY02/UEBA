import http from '../http'
import moment from 'moment'
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
  // return http({
  //   method: 'get',
  //   url: '/api/unusual/event/trend'
  // })
}

export default {
  HomeUnusualEventTrend
}