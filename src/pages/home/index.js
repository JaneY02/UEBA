import { Component } from 'react'
import { Card, Empty, Avatar, Row, Col, Timeline, Tag, Tooltip } from 'antd'
import { ChartCard, Field, MiniArea, MiniBar, MiniProgress } from 'ant-design-pro/lib/Charts'
import Trend from 'ant-design-pro/lib/Trend'
import { QuestionCircleOutlined, UserOutlined, CaretDownOutlined, CaretUpOutlined, ReloadOutlined, WomanOutlined, ManOutlined, LaptopOutlined, EnvironmentOutlined, WarningOutlined } from '@ant-design/icons'
import numeral from 'numeral'
import moment from 'moment'
import './index.less'
import API from '../../api/modules/home'
import ChartLineBar from '../../components/chart-line-bar'
import ChartBubble from '../../components/chart-bubble'
import { FILTER_Usertype_Text, FILTER_Usertype_color } from '../../utils/filters'
class Home extends Component {
  riskTopHeight = '540px'
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
    activedUsers: [],
    lastAnomaly: [],
    riskAssetTop: [],
    riskUserTop: [],
    riskEventTop: [],
    // allClassify: [],
    // bubbleLegendData: []
  }
  componentDidMount () {
    this.getTotalNum()
    this.getUnusualTrend()
    this.getActivedUser()
    this.getLastAnomaly()
    this.getRiskAssetTop()
    this.getRiskUserTop()
    this.getRiskEventTop()
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
  /* 获取活跃用户 */
  getActivedUser = () => {
    API.HomeActivedUser().then(res => {
      let { code, data } = res
      if (code === 200) {
        this.setState({ activedUsers: data || [] })
      }
    })
  }
  /* 获取最新风险事件 */
  getLastAnomaly = () => {
    API.HomeLastAnomaly().then(res => {
      let { code, data } = res
      if (code === 200) {
        this.setState({ lastAnomaly: data || [] })
      }
    })
  }
  /* 高危资产Top10 */
  getRiskAssetTop = () => {
    this.setState({ riskAssetTop: this.setArrFullofLen([], 10) })
    API.HomeRiskAssetTop().then(res => {
      let { code, data } = res
      if (code === 200) {
        let newAssetRank = this.setArrFullofLen(data, 10)
        newAssetRank.map(item => item.percent = 100 * (item.value / item.total).toFixed(2))
        this.setState({ riskAssetTop: newAssetRank.sort((a, b) => b.percent - a.percent) })
      }
    })
  }
  /* 风险事件Top10 */
  getRiskEventTop = () => {
    this.setState({ riskEventTop: this.setArrFullofLen([], 10) })
    API.HomeRiskEventTop().then(res => {
      let { code, data } = res
      if (code === 200) {
        let newRiskEventRank = this.setArrFullofLen(data, 10)
        newRiskEventRank.map(item => item.percent = 100 * (item.value / item.total).toFixed(2))
        this.setState({ riskEventTop: newRiskEventRank.sort((a, b) => b.percent - a.percent) })
      }
    })
  }
  /* 获取高危用户排名数据 */
  getRiskUserTop = () => {
    this.setState({ riskUserTop: this.setArrFullofLen([], 10) })
    API.HomeRiskUserTop().then(res => {
      let { code, data } = res
      if (code === 200) {
        let newUserRank = this.setArrFullofLen(data, 10)
        newUserRank.map(item => item.percent = 100 * (item.value / item.total).toFixed(2))
        this.setState({ riskUserTop: newUserRank.sort((a, b) => b.percent - a.percent) })
      }
    })
  }
  /* 设置数组为满值，长度不够用缺省补充 */
  setArrFullofLen = (data, len) => {
    let originalLen = (data && data.length) ? data.length : 0
    let result = data
    if (originalLen < len) {
      for(let i = originalLen; i < len; i++) {
        result.push({default: true})
      }
    }
    return result
  }
  render () {
    let { totalInfo, unusualEventData, activedUsers, lastAnomaly, riskAssetTop, riskUserTop, riskEventTop } = this.state
    console.log(111, riskAssetTop)
    const upIcon = <CaretUpOutlined className="marginLeft2" style={{color: '#52c41a', transform: 'scale(.8)'}} />
    const downIcon = <CaretDownOutlined className="marginLeft2" style={{color: '#f5222d', transform: 'scale(.8)'}} />
    return (
      <div className="home">
        <Row gutter={8}>
          <Col xxl={6} xl={6} lg={12} md={24} sm={24} xs={24} className="marginBottom8">
            <ChartCard
              bordered={false}
              title="高危用户量"
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
              title="高危资产量"
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
        <Card size="small" extra={<ReloadOutlined onClick={() => this.getUnusualTrend()} className="card-refresh-icon" />} title="异常事件"  bordered={false} className="marginBottom8 dark-card">
          <ChartLineBar
            id="unusualEventId"
            themeMode="dark"
            tooltipLoop={false}
            data={unusualEventData} />
        </Card>
        <Row gutter={8}>
          <Col xxl={13} xl={11} lg={24} md={24} sm={24} xs={24}>
            <Card size="small" extra={<ReloadOutlined onClick={() => this.getActivedUser()} className="card-refresh-icon" />} title="活跃用户" bordered={false} className="marginBottom8 dark-card">
              <ChartBubble
                id="activeUserId"
                data={activedUsers} />
            </Card>
          </Col>
          <Col xxl={11} xl={13} lg={24} md={24} sm={24} xs={24}>
            <Card size="small" extra={<ReloadOutlined onClick={() => this.getLastAnomaly()} className="card-refresh-icon" />} title="最新风险事件" bordered={false} className="marginBottom8 dark-card">
              <div style={{height: '400px'}}>
                {lastAnomaly.length ? (
                  <Timeline mode="left" className="dark-timeline">
                    {
                      lastAnomaly.map((item, index) => (
                        <Timeline.Item key={index}>
                          <span className="text-ellipsis">{item.time} {item.desc}</span>
                        </Timeline.Item>
                      ))
                    }
                  </Timeline>
                ) : (
                  <Empty className="dark-empty page-empty" image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />
                )}
              </div>
            </Card>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card size="small" extra={<ReloadOutlined onClick={() => this.getRiskAssetTop()} className="card-refresh-icon" />} title="高危资产 Top" bordered={false} className="marginBottom8 dark-card">
              <div style={{height: this.riskTopHeight}} className="high-risk-wrap">
                {
                  riskAssetTop.map((item, index) => {
                    if (item.default) {
                      return (
                        <div className="high-risk-top default" key={index}>
                          <div className="top">
                            <span className="name"></span>
                            <span className="value"></span>
                          </div>
                          <span className="bar"></span>
                        </div>
                      )
                    } else {
                      return (
                        <div key={index}>
                          <div className="high-risk-top" key={index}>
                            <div className="top">
                              <span className="name">{item.name}</span>
                              <span className="value">{numeral(item.value).format('0,0')}</span>
                            </div>
                            <span className="bar" style={{width: item.percent + '%'}}></span>
                          </div>
                        </div>
                      )
                    }
                  })
                }
              </div>
            </Card>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card size="small" extra={<ReloadOutlined onClick={() => this.getRiskEventTop()} className="card-refresh-icon" />} title="风险事件 Top" bordered={false} className="marginBottom8 dark-card">
              <div style={{height: this.riskTopHeight}} className="high-risk-wrap">
                {
                  riskEventTop.map((item, index) => {
                    if (item.default) {
                      return (
                        <div className="high-risk-top default" key={index}>
                          <div className="top">
                            <span className="name"></span>
                            <span className="value"></span>
                          </div>
                          <span className="bar"></span>
                        </div>
                      )
                    } else {
                      return (
                        <div key={index}>
                          <div className="high-risk-top" key={index}>
                            <div className="top">
                              <span className="name">{item.name}</span>
                              <span className="value">{numeral(item.value).format('0,0')}</span>
                            </div>
                            <span className="bar" style={{width: item.percent + '%'}}></span>
                          </div>
                        </div>
                      )
                    }
                  })
                }
              </div>
            </Card>
          </Col>
          <Col xxl={8} xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card size="small" extra={<ReloadOutlined onClick={() => this.getRiskUserTop()} className="card-refresh-icon" />} title="高危用户 Top" bordered={false} className="marginBottom8 dark-card">
              <div style={{height: this.riskTopHeight}} className="high-risk-user-wrap">
                {
                  riskUserTop.map((item, index) => {
                    if (item.default) {
                      return (
                        <div className="high-risk-top-user default" key={index}>
                          <Avatar icon={<UserOutlined />} className="dark-avatar" />
                          <div className="user-info">
                            <div className="info-top">
                              <span className="name"></span>
                              <span className="score"></span>
                            </div>
                            <div className="info-other"></div>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div className="high-risk-top-user" key={index}>
                          <Avatar src={item.photo} />
                          <div className="user-info">
                            <div className="info-top">
                              <div>
                                <Tag color={FILTER_Usertype_color(item.userType)} className="dark-tag">{FILTER_Usertype_Text(item.userType)}</Tag>
                                <span className="name">{item.name}</span>
                              </div>
                              <span className="score">{numeral(item.score).format('0,0')}</span>
                            </div>
                            <div className="info-other">
                              {item.gender * 1 === 1 ? (<WomanOutlined title="女" className="icon-female-color" />) : (<ManOutlined title="男" className="icon-male-color" />)}
                              <span className="other">
                                <WarningOutlined title="事件总数" />
                                {numeral(item.RiskEvent).format('0,0') || '-'}
                              </span>
                              <span className="other">
                                <LaptopOutlined title="用户IP" />
                                {item.ip || '-'}
                              </span>
                              <span className="other">
                                <EnvironmentOutlined title="工作地点" />
                                {item.region || '-'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })
                }
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Home