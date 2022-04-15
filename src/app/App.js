import { Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import LogOut from './layouts/logOut'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfessions'
import QualitiesProvider from './hooks/useQualities'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'

const App = () => {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <ProfessionProvider>
          <QualitiesProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </QualitiesProvider>
        </ProfessionProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  )
}

export default App
