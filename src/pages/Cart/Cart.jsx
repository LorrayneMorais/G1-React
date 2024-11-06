import React, { useContext} from "react";

import "./Cart.css";
import { CartItem } from "../../components/cart/CartItem/CartItem";
import { ProductContext } from "../../contexts/CartContext/ProductContext";


export function Cart() {
    const {cart} = useContext(ProductContext);



    return (

        <section className="cart">
            <div className="cart-contents">
                {cart.map((product) => <CartItem key={product.id} data={{id:product.id, imgUrl:product.imgUrl, name:product.name, price:product.price, quantity:product.quantity}} />)}
            </div>
            <div className="cart-resume">
                <h3>Resumo do pedido</h3>
                <h3 className="cart-resume-title">Finalizar</h3>
            </div>
        </section>
    );
}
