import { Route, Switch, Redirect } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import EditUserPage from './components/page/userEditPage'

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </>
  )
}

export default App
