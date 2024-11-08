import React, {useContext, useEffect, useState} from "react";
import "./CartItem.css";
import { TbTrashXFilled } from "react-icons/tb";

import PropTypes from "prop-types";
import { ProductContext } from "../../../contexts/CartContext/ProductContext";
import { formatPrice } from "../../../utils/PriceFormatter";

export function CartItem({data}) {

    const {imgUrl, quantity, name, price, id } = data
    const {cart, setCart,products} = useContext(ProductContext);
    const [qtd, setQtd] = useState(quantity);
    const [maxQtd, setMaxQtd] = useState(0);

    useEffect(()=> {
        setQtd(quantity);
    }, [quantity]);

    const maxQuantity = () => {
        const product = products.find((product) => product.id == id);
        if (product) {
            setMaxQtd(product.quantity);
        }
    }

    useEffect(() => {
        maxQuantity();
    }, [cart]);


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
                <div className="cart-item-qtd">
                    <div>
                        <h3 className="cart-item-price">{formatPrice(price)}</h3>
                    </div>
                    <div className="card__quantity">
                        <input type="number" min={0} max={maxQtd} value={qtd} onChange={handleUpdateQuantity}></input>
                    </div>
                </div>
                    <button type="button" className="button__remove-item" onClick={handleRemoveItem} >
                        <TbTrashXFilled />
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
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
    }).isRequired,
};
