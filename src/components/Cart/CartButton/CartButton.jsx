import React, { useContext } from "react";
import "./CartButton.css";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { ProductContext } from "../../../contexts/CartContext/ProductContext";



export function CartButton() {
    const {cart, isCartVisible, setIsCartVisible} = useContext(ProductContext);
    const handleCart = () => {
        if(cart.length == 0) {
            alert("Adcione um produto ao carrinho");
        }
        setIsCartVisible(!isCartVisible);
    }
    return (
        <button type="button" onClick={handleCart} className="cart__button">
            <AiOutlineShoppingCart/>
            {cart.map((item) => Number(item.quantity)).reduce((a, b) => a + b, 0) > 0 && <span className="cart-status"> {cart.map((item) => Number(item.quantity)).reduce((a, b) => a + b, 0)}</span>}
        </button>
    );
}