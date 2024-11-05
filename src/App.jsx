import './App.css';
import React from 'react';
import { CartButton } from './components/cart/CartButton/CartButton';
import { Cart } from './pages/Cart/Cart';



function App() {
  return (
    <>
    <CartButton />
    <Cart />
    </>
  );
}

export default App;