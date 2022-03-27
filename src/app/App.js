import { Redirect, Route, Switch } from 'react-router-dom'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import Users from './layouts/users'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfessions'
import QualitiesProvider from './hooks/useQualities'

const App = () => {
  return (
    <>
      <NavBar />
      <ProfessionProvider>
        <QualitiesProvider>
          <Switch>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </QualitiesProvider>
      </ProfessionProvider>

      <ToastContainer />
    </>
  )
}

export default App
