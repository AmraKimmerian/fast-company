import NavBar from './component/navBar'
import { Route, Switch } from 'react-router-dom'
import Main from './component/main'
import Login from './component/login'
import Users from './component/users'

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
        <Route path="/" component={Main} />
      </Switch>
    </>
  )
}

export default App
