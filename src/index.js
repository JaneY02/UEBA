import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css' // 暗黑主题
// import 'antd/dist/antd.compact.css' // 紧凑主题
import './styles/common.less'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

// 只有通过Route组件渲染的组件，才能在this.props上找到history对象
// 如果希望没有被Router包裹的组件也能访问history对象
// 可以使用withRouter包裹：export default withRouter(AppHeader)

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
