import { Switch, Route, Redirect } from 'react-router-dom'
import { Component } from 'react'
import { appRoutes } from './router'

class App extends Component {
  render () {
    return (
      <Switch>
        {
          appRoutes.map(route => <Route key={route.path} path={route.path} component={route.component}></Route>)
        }
        <Redirect from="/" to="/ueba"></Redirect>
      </Switch>
    )
  }
}

export default App
