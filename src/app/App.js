import { Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import LogOut from './layouts/logOut'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/common/protectedRoute'
import AppLoader from './components/hoc/appLoader'

const App = () => {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </>
  )
}

export default App
