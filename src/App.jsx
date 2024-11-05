import './App.css';
import React from 'react';
import { CartButton } from './components/cart/CartButton/CartButton';
import { Cart } from './pages/Cart/Cart';
import { ProductProvider } from './contexts/CartContext/ProductContext';
import { Products } from './pages/Products/Products';



function App() {
  return (
    <>
    <ProductProvider>
    <CartButton />
    <Cart />
    <Products />
    </ProductProvider>
    </>
  );
}

export default App;