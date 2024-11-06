import React, {useContext, useEffect, useState} from "react";
import "./CartItem.css";

import PropTypes from "prop-types";
import { ProductContext } from "../../../contexts/CartContext/ProductContext";

export function CartItem({data}) {

    const {imgUrl, quantity, name, price, id } = data
    const {cart, setCart} = useContext(ProductContext);
    const [qtd, setQtd] = useState(quantity);

    useEffect(()=> {
        setQtd(quantity);
    }, [quantity]);


    const handleRemoveItem = () => {
        const newCart = cart.filter((product) => product.id !== id);
        setCart(newCart);
    };

    const handleUpdateQuantity = (e) => {
        setQtd(Number(e.target.value))
        setCart(cart.map((product) => {
                if(product.id === id) {
                    return {...product, quantity: Number(e.target.value)}
                }
                return product;
            }));
            if(Number(e.target.value) === 0) {
                handleRemoveItem();
            }
    };




    return(
        <>
        <section className="cart-item" key={id}>
            <img
            src={imgUrl}
            alt=""
            className="cart-item-image"/>
            <div className="cart-item-content">
                <h3 className="cart-item-title">{name}</h3>
                <h3 className="cart-item-price">{price}</h3>
                <input type="number" min="0" value={qtd} onChange={handleUpdateQuantity} className="card__quantity"></input>
                <button type="button" className="button__remove-item" onClick={handleRemoveItem} >
                    X
                </button>
            </div>
        </section>
        </>
    )
}

CartItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imgUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
};
