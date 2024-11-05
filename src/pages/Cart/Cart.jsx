import React, { useEffect, useState } from "react";

import "./Cart.css";
import api from "../../api/api";
import { CartItem } from "../../components/cart/CartItem/CartItem";




export function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getCartItem();
    }, []);

    const getCartItem = async () => {
        const response = await api.get('/cart');
        if(response.status === 200){
            setCart(response.data);
            console.log(response.data);
        }else{
            alert('Erro ao buscar os itens do carrinho');
        }
    }

    return (

        <section className="cart">
            <div className="cart-content">
                <CartItem />
            </div>
            <div className="cart-resume">
            <h3>Resumo do pedido</h3>
            <h3 className="cart-resume-title">Finalizar</h3>
            </div>
        </section>
    );
}
