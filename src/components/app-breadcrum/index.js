import { Component } from 'react'
import { Breadcrumb } from 'antd'
import './index.less'

class AppBreadCrum extends Component {
  render () {
    let { breadcrumArr } = this.props
    if (breadcrumArr.length) {
      return (
        <Breadcrumb className="app-breadcrum">
          {
            breadcrumArr.map((item, index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))
          }
        </Breadcrumb>
      )
    } else {
      return null
    }
  }
}

export default AppBreadCrum