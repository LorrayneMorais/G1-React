import './App.css';
import { Login } from './pages/Login/Login'
import { Products } from './pages/Products/Products';
import { Signup } from './pages/Signup/Signup'
import { Cart } from './pages/Cart/Cart'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'



function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={Products} />
        <Route exact path='/cart' component={Cart} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;