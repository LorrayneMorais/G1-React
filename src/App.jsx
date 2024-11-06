import './App.css';
import { Login } from './pages/Login/Login'
import { Products } from './pages/Products/Products';
import { Signup } from './pages/Signup/Signup'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import { SignUpContext } from './contexts/SignUpContext/SignUpContext';
import { useContext } from 'react';
import { NotLogged } from './pages/notLogged/notLogged';

const PrivateRoute = ({ path, component }) => {
  const { logged } = useContext(SignUpContext)
  return (
    logged ? <Route exact path={path} component={component} /> : <Redirect to='/notLogged' />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/notLogged' component={NotLogged} />
        <PrivateRoute exact path='/home' component={Products} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;