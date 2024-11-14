import React, { useContext, useEffect, useState } from "react";
import './CartItem.css';
import { TbTrashXFilled } from "react-icons/tb";
import PropTypes from "prop-types";
import { ProductContext } from "../../../contexts/CartContext/ProductContext";
import { formatPrice } from "../../../utils/PriceFormatter";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

export function CartItem({ data }) {

    const { imgUrl, quantity, name, price, id } = data
    const { cart, setCart, maxQtd, setMaxQtd, products, cartQtd, setCartQtd } = useContext(ProductContext);
    // const [qtd, setQtd] = useState(quantity);

    useEffect(() => {
        setCartQtd(quantity);
    }, [quantity]);

    const handleClearItem = () => {
        const newCart = cart.filter((product) => product.id !== id);
        setCart(newCart);
    };



    const maxQuantity = () => {
        const product = products.find((product) => product.id == id);
        if (product) {
            setMaxQtd(product.quantity);
        }
    }

    useEffect(() => {
        maxQuantity();
    }, [cart, products]);

    const handleAddItem = () => {
        if (cartQtd < maxQtd) {
            const newQuantity = cartQtd + 1;
            setCartQtd(newQuantity);  // Atualiza o estado local
            setCart(prevCart => prevCart.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: newQuantity };  // Atualiza o carrinho com a nova quantidade
                }
                return item;
            }));
        }
    }
    
    const handleRemoveItem = () => {
        if (cartQtd > 1) {
            const newQuantity = cartQtd - 1;
            setCartQtd(newQuantity);  // Atualiza o estado local
            setCart(prevCart => prevCart.map(item => {
                if (item.id === id) {
                    return { ...item, quantity: newQuantity };  // Atualiza o carrinho com a nova quantidade
                }
                return item;
            }));
        }
    }


    return (
        <section className="cart-item" key={id}>
            <img
                src={imgUrl}
                alt=""
                className="cart-item-image" />
            <div className="cart-item-content">
                <h3 className="cart-item-title">{name}</h3>
                <div className="cart-item-qtd">
                    <div>
                        <h3 className="cart-item-price">{formatPrice(price)}</h3>
                        <br />
                        <div className="cart-button-qtd-container">
                            <button key='remove-btn' onClick={handleRemoveItem} ><CiSquareMinus /></button>
                            <button key='add-btn' onClick={handleAddItem}><CiSquarePlus /></button>
                        </div>
                    </div>
                    <div className="card__quantity">
                        <span  min={0} max={maxQtd} >{quantity ?? 0}</span>
                    </div>
                </div>
                <button type="button" className="button__remove-item" onClick={handleClearItem} >
                    <TbTrashXFilled />
                </button>
            </div>
        </section>
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
