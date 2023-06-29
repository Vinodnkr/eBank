import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/ebank/login" component={Login} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </Switch>
)

export default App
