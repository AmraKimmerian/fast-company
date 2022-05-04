import { Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import LogOut from './layouts/logOut'
import { ToastContainer } from 'react-toastify'

import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'
import { loadProfessionsList } from './store/professions'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
  }, [])

  return (
    <>
      <AuthProvider>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact component={Main} />
          <Redirect to="/" />
        </Switch>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
