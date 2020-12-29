import { Component } from 'react'
import { Button } from 'antd'
import './index.less'
import emptyImgSrc from '../../imgs/404.svg'

class NotFound extends Component {
  goHome = () => {
    this.props.history.push('/ueba/home')
  }
  render () {
    return (
      <div className="not-found">
        <img src={emptyImgSrc} alt="404" />
        <Button type="link" onClick={this.goHome}>返回总览页</Button>
      </div>
    )
  }
}

export default NotFound