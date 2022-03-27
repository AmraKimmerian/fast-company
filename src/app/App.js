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
      <Switch>
        <ProfessionProvider>
          <QualitiesProvider>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
          </QualitiesProvider>
        </ProfessionProvider>
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </>
  )
}

export default App
