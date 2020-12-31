import { Component, Fragment } from 'react'
import { Card, Empty, Avatar, Row, Col, Timeline, Button, Tag, Tooltip } from 'antd'
import { ChartCard, Field, MiniArea, MiniBar, MiniProgress } from 'ant-design-pro/lib/Charts'
import Trend from 'ant-design-pro/lib/Trend'
import { UngroupOutlined, QuestionCircleOutlined, UserOutlined, CaretDownOutlined, CaretUpOutlined, ReloadOutlined, ClockCircleOutlined, WomanOutlined, ManOutlined, LaptopOutlined, EnvironmentOutlined, WarningOutlined } from '@ant-design/icons'
import numeral from 'numeral'
import moment from 'moment'
import './index.less'
import API from '../../api/modules/home'
import ChartLineBar from '../../components/chart-line-bar'
class Home extends Component {
  state = {
    totalInfo: {
      userWeekRatioTrend: '',
      userDayRatioTrend: '',
      userWeekRatio: '-',
      userDayRatio: '-',
      highRiskUser: '-',
      totalUser: '-',
      highRiskAsset: '-',
      assetTotal: '-',
      assetMiniBar: [],
      highRiskEvent: '-',
      dayBrowseTotal: '-',
      browseMiniArea: [],
      safeScore: '-',
      safeWeekRatio: '',
      safeDayRatio: '',
      safeWeekRatioTrend: '',
      safeDayRatioTrend: ''
    },
    unusualEventData: {},
    // riskUserRank: [],
    // lastAnomaly: [],
    // activeUsers: [],
    // riskEventRank: [],
    // assetRank: [],
    // allClassify: [],
    // bubbleLegendData: []
  }
  componentDidMount () {
    this.getTotalNum()
    this.getUnusualTrend()
    this.getRiskUserRank()
    this.getLastAnomaly()
    this.getActiveUser()
    this.getRiskEventRank()
    this.getAssetRank()
    this.getClassify()
  }
  /* 获取头部总数 */
  getTotalNum = () => {
    const beginDay = new Date().getTime()
    let browseMiniArea = []
    let assetMiniBar = []
    for (let i = 0; i < 20; i += 1) {
      browseMiniArea.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10
      })
      assetMiniBar.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10
      })
    }
    this.setState({
      totalInfo: {
        userWeekRatioTrend: 'up',
        userDayRatioTrend: 'down',
        userWeekRatio: (Math.random() * 100).toFixed(0) + '%' || '-',
        userDayRatio: (Math.random() * 100).toFixed(0) + '%' || '-',
        highRiskUser: numeral((Math.random() * 200000).toFixed(0)).format('0,0') || '-',
        totalUser: numeral((Math.random() * 2000000).toFixed(0)).format('0,0') || '-',
        highRiskAsset: numeral((Math.random() * 200000).toFixed(0)).format('0,0') || '-',
        assetTotal: numeral((Math.random() * 500000).toFixed(0)).format('0,0') || '-',
        highRiskEvent: numeral((Math.random() * 200000).toFixed(0)).format('0,0') || '-',
        dayBrowseTotal: numeral((Math.random() * 200000).toFixed(0)).format('0,0') || '-',
        browseMiniArea,
        safeScore: numeral((Math.random() * 100).toFixed(0)).format('0,0') || '-',
        safeWeekRatioTrend: 'up',
        safeDayRatioTrend: 'up',
        safeWeekRatio: numeral((Math.random() * 100).toFixed(0)).format('0,0') + '%'  || '-',
        safeDayRatio: numeral((Math.random() * 100).toFixed(0)).format('0,0') + '%'  || '-',
        assetMiniBar
      }
    })
  }
  /* 获取趋势图 */
  getUnusualTrend = () => {
    API.HomeUnusualEventTrend().then(res => {
      let { code, data } = res
      if (code === 200) {
        let tempUnusualEventData = {
          xAxisData: data.map(item => item.time),
          seriesData: [{
            name: '异常事件',
            data: data.map(item => item.value)
          }]
        }
        this.setState({ unusualEventData: tempUnusualEventData })
      }
    })
  }
  /* 获取高危用户排名数据 */
  getRiskUserRank = () => {
    // this.setState({ riskUserRank: this.setArrFullofLen([], 10) })
    // API.HomeRiskUserRank().then(res => {
    //   let { code, data } = res
    //   if (code === 200) {
    //     let newUserRank = this.setArrFullofLen(data, 10)
    //     this.setState({ riskUserRank: newUserRank })
    //   }
    // })
  }
  /* 获取最新风险事件 */
  getLastAnomaly = () => {
    // API.HomeRiskLastAnomaly().then(res => {
    //   let { code, data } = res
    //   if (code === 200) {
    //     this.setState({ lastAnomaly: data || [] })
    //   }
    // })
  }
  
  /* 获取活跃用户 */
  getActiveUser = () => {
    // API.HomeActiveUser().then(res => {
    //   let { code, data } = res
    //   if (code === 200) {
    //     this.setState({ activeUsers: data || [] })
    //   }
    // })
  }
  /* 风险事件Top10 */
  getRiskEventRank = () => {
    // this.setState({ riskEventRank: this.setArrFullofLen([], 10) })
    // API.HomeRiskEventRank().then(res => {
    //   let { code, data } = res
    //   if (code === 200) {
    //     let newRiskEventRank = this.setArrFullofLen(data, 10)
    //     newRiskEventRank.map(item => item.per = 100 * (item.risknum / newRiskEventRank[0].risknum).toFixed(2))
    //     this.setState({ riskEventRank: newRiskEventRank })
    //   }
    // })
  }
  /* 高危资产Top10 */
  getAssetRank = () => {
    // this.setState({ assetRank: this.setArrFullofLen([], 10) })
    // API.HomeRiskAsset().then(res => {
    //   let { code, data } = res
    //   if (code === 200) {
    //     let newAssetRank = this.setArrFullofLen(data, 10)
    //     newAssetRank.map(item => item.per = 100 * (item.risknum / newAssetRank[0].risknum).toFixed(2))
    //     this.setState({ assetRank: newAssetRank })
    //   }
    // })
  }
  /* 获取所有活跃用户分类 */
  getClassify = () => {
    // API.ActiveUserClassify().then(res => {
    //   let { code, data } = res
    //   if (code === 200) {
    //     let legendData = data.map(cate => cate.name)
    //     this.setState({ 
    //       allClassify: data,
    //       bubbleLegendData: legendData
    //      })
    //   }
    // })
  }
  /* 设置数组为满值，长度不够用缺省补充 */
  setArrFullofLen = (data, len) => {
    // let originalLen = (data && data.length) ? data.length : 0
    // let result = data
    // if (originalLen < len) {
    //   for(let i = originalLen; i < len; i++) {
    //     result.push({default: true})
    //   }
    // }
    // return result
  }
  goUserInfoDetail = personId => {
    // this.props.history.push({
    //   pathname: '/ueba/user/info/edit',
    //   state: { personId }
    // })
    // // 刷新菜单栏
    // window.location.reload()
  }
  goBehaviorActDetail = personId => {
    // this.props.history.push({
    //   pathname: '/ueba/behavior/act/detail',
    //   state: { personId }
    // })
    // // 刷新菜单栏
    // window.location.reload()
  }
  render () {
    let { totalInfo, unusualEventData } = this.state
    const upIcon = <CaretUpOutlined className="marginLeft2" style={{color: '#52c41a', transform: 'scale(.8)'}} />
    const downIcon = <CaretDownOutlined className="marginLeft2" style={{color: '#f5222d', transform: 'scale(.8)'}} />
    return (
      <div className="home">
        <Row gutter={8}>
          <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24} className="marginBottom8">
            <ChartCard
              bordered={false}
              title="高危用户"
              action={
                <Tooltip title="指标说明">
                  <QuestionCircleOutlined />
                </Tooltip>
              }
              total={totalInfo.highRiskUser}
              className="total-card"
              contentHeight={46}
              footer={
                <Field label="用户总数" value={totalInfo.totalUser} />
              }>
                <span>
                  周同比
                  <Trend className="marginLeft8">{totalInfo.userWeekRatio}</Trend>
                  {totalInfo.userWeekRatioTrend==='up'?upIcon:downIcon}
                </span>
                <span className="marginLeft24">
                  日环比
                  <Trend className="marginLeft8">{totalInfo.userDayRatio}</Trend>
                  {totalInfo.userDayRatioTrend==='up'?upIcon:downIcon}
                </span>
            </ChartCard>
          </Col>
          <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24} className="marginBottom8">
            <ChartCard
              bordered={false}
              title="高危资产"
              action={
                <Tooltip title="指标说明">
                  <QuestionCircleOutlined />
                </Tooltip>
              }
              total={totalInfo.highRiskAsset}
              className="total-card"
              contentHeight={46}
              footer={
                <Field label="资产总数" value={totalInfo.assetTotal} />
              }>
               <MiniBar color="#965FE3" height={46} data={totalInfo.assetMiniBar} />
            </ChartCard>
          </Col>
          <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24} className="marginBottom8">
            <ChartCard
              bordered={false}
              title="高危访问量"
              action={
                <Tooltip title="指标说明">
                  <QuestionCircleOutlined />
                </Tooltip>
              }
              total={totalInfo.highRiskEvent}
              className="total-card"
              contentHeight={46}
              footer={
                <Field label="日访问量" value={totalInfo.dayBrowseTotal} />
              }>
              <MiniArea line height={46} data={totalInfo.browseMiniArea} />
            </ChartCard>
          </Col>
          <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24} className="marginBottom8">
            <ChartCard
              bordered={false}
              title="总体安全指数"
              action={
                <Tooltip title="指标说明">
                  <QuestionCircleOutlined />
                </Tooltip>
              }
              className="total-card"
              total={totalInfo.safeScore+'%'}
              contentHeight={46}
              footer={
                <div>
                  <span>
                    周同比
                    <Trend className="marginLeft8">{totalInfo.safeWeekRatio}</Trend>
                    {totalInfo.safeWeekRatioTrend==='up'?upIcon:downIcon}
                  </span>
                  <span className="marginLeft24">
                    日环比
                    <Trend className="marginLeft8">{totalInfo.safeDayRatio}</Trend>
                    {totalInfo.safeDayRatioTrend==='up'?upIcon:downIcon}
                  </span>
                </div>
              }>
              <MiniProgress percent={totalInfo.safeScore} strokeWidth={8} target={80} />
            </ChartCard>
          </Col>
        </Row>
        <Card size="small" extra={<ReloadOutlined onClick={() => this.getUnusualTrend()} className="card-refresh-icon" />} title="异常事件总数"  bordered={false} className="marginBottom8 dark-card">
          <ChartLineBar
            id="unusualEventId"
            themeMode="dark"
            tooltipLoop={false}
            data={unusualEventData} />
        </Card>
      </div>
    )
  }
}

export default Home