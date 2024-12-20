import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SignupProvider } from './contexts/SignUpContext/SignUpContext'
import { ProductProvider } from './contexts/CartContext/ProductContext';
import { CartButton } from './components/Cart/CartButton/CartButton'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <SignupProvider>
            <ProductProvider>
                <App />
            </ProductProvider>
        </SignupProvider>
    </StrictMode>,
)
