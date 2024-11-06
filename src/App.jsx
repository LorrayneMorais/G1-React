import './App.css';
import { Login } from './pages/Login/Login'
import { Products } from './pages/Products/Products';
import { Signup } from './pages/Signup/Signup'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import { SignUpContext } from './contexts/SignUpContext/SignUpContext';
import { useContext } from 'react';
import { NotLogged } from './pages/notLogged/notLogged';

import ProductPage from './pages/ProdutPage/ProductPage';

import { Checkout } from './pages/Checkout/checkout';



const PrivateRoute = ({ path, component }) => {
  const { logged } = useContext(SignUpContext)
  return (
    logged ? <Route exact path={path} component={component} /> : <Redirect to='/notLogged' />
  )
}

function App() {
  return (

    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/notLogged' component={NotLogged} />
          <Route exact path='/home' component={Products} />
          <Route exact path='/product/:id' component={ProductPage} />
          <Route exact path='/checkout' component={Checkout} />
        </Switch>
      </BrowserRouter>
    </div>

  );
}

export default App;