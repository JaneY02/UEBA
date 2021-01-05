import { Component } from 'react'
import { Empty } from 'antd'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/graph'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

const colors = ['#4168FF', '#47CBFF', '#FF7A33', '#45DE7F', '#FFAC34']

class ChartBubble extends Component {
  echartsObj = null
  state = {
    bubbleData: []
  }
  componentDidMount () {
    window.addEventListener('resize', this.chartResize)
  }
  chartResize = () => {
    setTimeout(() => {
      this.echartsObj && this.echartsObj.resize()
    }, 300)
  }
  componentWillUnmount () {
    window.removeEventListener('resize', this.chartResize)
  }
  // 当props发生改变--start
  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      bubbleData: nextProps.data
    }
  }
  componentDidUpdate () {
    let { bubbleData } = this.state
    let { id } = this.props
    let allUserType = bubbleData.map(item => item.userType)
    allUserType = [...new Set(allUserType)]
    let categories = allUserType.map(item => {
      return { name: item }
    })
    if (bubbleData.length) {
      this.echartsObj = echarts.init(document.getElementById(id))
      let option = {
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: '#aaa',
          extraCssText: 'box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)',
          textStyle: {
            color: 'rgba(255,255,255,0.65)',
            fontSize: 12
          },
          formatter: (param) => {
            let { marker } = param
            let { name, category, value } = param.data
            let result = '<p>'+name+'</p>'
            result += '<p>'+marker+'用户类型：'+category+'</p>'
            result += '<p>'+'活跃次数：'+value+'</p>'
            return result
          }
        },
        animationDuration: 3000,
        animationEasingUpdate: 'quinticInOut',
        color: colors,
        legend: {
          show: true,
          orient: 'vertical',
          left: 10,
          bottom: 10,
          itemWidth: 12,
          itemHeight: 2,
          textStyle: {
            color: 'rgba(255, 255, 255, 0.65)'
          },
          data: allUserType
        },
        series: [{
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 70, // 节点之间的斥力因子
            edgeLength: 8
          },
          roam: true, // 鼠标缩放
          categories,
          data: [],
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          }
        }]
      }
      bubbleData.forEach((item, index) => {
        let tempData = {
          name: item.name,
          value: item.activeNum,
          category: item.userType,
          symbolSize: bubbleData.length > 10 ? item.activeNum * 0.2 : item.activeNum * 0.4,
          draggable: true,
          itemStyle: {
            normal: {
              shadowBlur: 6,
              shadowColor: colors[allUserType.findIndex(type => type === item.userType)]
            }
          }
        }
        option.series[0].data.push(tempData)
      })
      this.echartsObj.setOption(option)
    }
  }
  // 当props发生改变--end
  render () {
    let { bubbleData } = this.state
    let { id, height = '380px' } = this.props
    return (
      <div style={{height: height}}>
        { bubbleData && bubbleData.length ? (
          <div id={id} className="full-height"></div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} className="dark-empty page-empty" />
        )}
      </div>
    )
  }
}

export default ChartBubble