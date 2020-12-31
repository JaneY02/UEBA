import { Component } from 'react'
import { Empty } from 'antd'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/markLine'
import store from '../../store'

class ChartLineBar extends Component {
  echartsObj = null
  loopTooltipTimer = null
  echartResizeTimer = null
  loopIndex = 0
  state = {
    xAxisData: [],
    seriesData: []
  }
  componentDidMount () {
    window.addEventListener('resize', this.chartResize)
    store.subscribe(() => {
      // store.subscribe用来监听store中state
      // 菜单动画有300ms，所以延迟器时长必须大于等于这个时间
      this.chartResize()
    })
  }
  chartResize = () => {
    this.echartResizeTimer = setTimeout(() => {
      this.echartsObj && this.echartsObj.resize()
    }, 300)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.chartResize)
    this.echartResizeTimer = null
    this.loopTooltipTimer = null
  }
  // 当props发生改变--start
  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      xAxisData: (nextProps.data && nextProps.data.xAxisData) ? nextProps.data.xAxisData : [],
      seriesData: (nextProps.data && nextProps.data.seriesData) ? nextProps.data.seriesData : []
    }
  }
  loopShowTooltip = () => {
    let { xAxisData } = this.state
    this.loopIndex = 0
    this.loopTooltipTimer = setInterval(() => {
      // echarts的diapatch方法
      this.echartsObj.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: this.loopIndex
      })
      this.loopIndex = this.loopIndex === xAxisData.length - 1 ? 0 : ++this.loopIndex
    }, 3000)
  }
  componentDidUpdate () {
    let { xAxisData, seriesData } = this.state
    let { id, themeMode = 'light', tooltipLoop = true } = this.props
    if (xAxisData && xAxisData.length) {
      this.echartsObj = echarts.init(document.getElementById(id))
      let option = {
        grid: {
          left: 40,
          right: 24,
          top: 20,
          bottom: 24
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#aaa',
          extraCssText: 'box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
          textStyle: {
            color: 'rgba(255,255,255,0.65)',
            fontSize: 12
          },
          axisPointer: {
            label: {
              show: false
            },
            lineStyle: {
              color: 'rgba(57, 88, 156, 1)',
              width: 1
            }
          },
          formatter: (param) => {
            let { dataIndex, marker, seriesName, value, axisValueLabel } = param[0]
            this.loopIndex = dataIndex
            let result = '<p>'+seriesName+'</p>'
            result += '<p>'+marker+axisValueLabel+'：'+value+'</p>'
            return result
          }
        },
        xAxis: {
          boundaryGap: false,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: themeMode === 'light' ? 'rgba(0, 0, 0, 0.45)' : 'rgba(255, 255, 255, 0.45)'},
          data: xAxisData
        },
        yAxis: {
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: '#666' },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted',
              color: themeMode === 'light' ? '#000' : '#fff',
              opacity: 0.23
            }
          }
        },
        series: []
      }
      seriesData.forEach((item, _) => {
        let tempSeries = {
          type: 'line',
          name: item.name,
          smooth: true,
          symbol: 'none',
          label: { show: true }, // 点上是否显示数值
          itemStyle: {
            color: 'rgba(57, 88, 156, 1)'
          },
          lineStyle: {
            width: 0
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: 'rgba(57, 88, 156, .9)'
              }, {
                offset: 1, color: 'rgba(57, 88, 156, .3)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          data: item.data
        }
        // 单数据有平均值
        if (seriesData.length === 1) {
          tempSeries.markLine = {
            silent: true,
            symbol: ['none', 'arrow'],
            lineStyle: {
              width: 1.5
            },
            label: {
              position: 'middle',
              formatter: '平均值 {c}'
            },
            data: [
              { type: 'average' }
            ]
          }
        }
        option.series.push(tempSeries)
      })
      this.echartsObj.setOption(option)
      tooltipLoop && this.loopShowTooltip()
    }
  }
  // 当props发生改变--end
  render () {
    let { xAxisData } = this.state
    let { id, height = '320px' } = this.props
    return (
      <div style={{height: height}}>
        { xAxisData && xAxisData.length ? (
          <div id={id} className="full-height"></div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} className="dark-empty page-empty" />
        )}
      </div>
    )
  }
}

export default ChartLineBar