import React, { useContext} from "react";

import "./Cart.css";
import { CartItem } from "../../components/cart/CartItem/CartItem";
import { ProductContext } from "../../contexts/CartContext/ProductContext";
import formatPrice from "../../utils/PriceFormatter";


export function Cart() {
    const {cart, isCartVisible} = useContext(ProductContext);

    const totalPrice = cart.reduce((acc, product) => {
        return acc + Number(product.quantity) * parseFloat(product.price);
    }, 0);

    return (
        <section className={`cart ${isCartVisible ? 'cart--active': ''}`}>
            <div className="cart-contents">
                {cart.map((product) => <CartItem key={product.id} data={{id:Number(product.id), imgUrl:product.imgUrl, name:product.name, price:product.price, quantity:product.quantity}} />)}
            </div>
            <div className="cart-resume">
                <h3>Total</h3>
                <h4>{formatPrice(parseFloat(totalPrice))}</h4>
            </div>
            <h3 className="cart-resume-title">Finalizar</h3>
        </section>
    );
}
