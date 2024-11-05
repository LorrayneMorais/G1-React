import react from "react";
import "./Cart.css";
import { CartItem } from "../../components/cart/CartItem/CartItem";

export function Cart() {
    return (
        <section className="cart">
            <div className="cart-content"><CartItem /></div>
            <div className="cart-resume">resumo da compra</div>
        </section>
    );
}
