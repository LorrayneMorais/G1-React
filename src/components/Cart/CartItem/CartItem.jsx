import React, {useContext, useState} from "react";
import "./CartItem.css";
import { ProductContext } from "../../../contexts/CartContext/ProductContext";
import api from "../../../api/api";


export function CartItem(){

    const {imgUrl, name, price } = useContext(ProductContext);

    return(
        <>
        
        <section className="cart-item">
            <img
            src={imgUrl}
            alt=""
            className="cart-item-image"/>
            <div className="cart-item-content">
                <h3 className="cart-item-title">{name}</h3>
                <h3 className="cart-item-price">{price}</h3>

                <button type="button" className="button__remove-item">
                    X
                </button>
            </div>
        </section>
        </>
    )
}

const getAllProducts = async (setProducts) => {
    const response = await api.get('/products');
    if(response.status === 200){
        setProducts(response.data);
        console.log(response.data);
    }else{
        alert('Erro ao buscar os produtos');
    }
}