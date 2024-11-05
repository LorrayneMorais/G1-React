import React from "react";
import "./CartItem.css";

export function CartItem(){
    return(
        <section className="cart-item">
            <img
            src="https://m.media-amazon.com/images/I/41897yAI4LL._SY445_SX342_.jpg"
            alt=""
            className="cart-item-image"/>
            <div className="cart-item-content">
                <h3 className="cart-item-title"> Livro do Harry Potter</h3>
                <h3 className="cart-item-price"> R$ 125,00</h3>

                <button type="button" className="button__remove-item">
                    X
                </button>

            </div>
        </section>
    )
}