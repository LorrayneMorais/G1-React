import React, { useContext } from "react";

import "./Cart.css";
import { CartItem } from "../../components/cart/CartItem/CartItem";
import { ProductContext } from "../../contexts/CartContext/ProductContext";
import { formatPrice } from "../../utils/PriceFormatter";
import { useHistory } from "react-router-dom";
import { TbWashDrycleanOff } from "react-icons/tb";



export function Cart() {
    const { cart, setCart, isCartVisible } = useContext(ProductContext);

    const history = useHistory();

    const handleClearCart = () => {
        setCart([]);
    };

    const totalPrice = cart.reduce((acc, product) => {
        return acc + Number(product.quantity) * parseFloat(product.price);
    }, 0);


    return (
        <>
            {cart.length > 0 &&
                <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
                    {cart.length > 0 &&
                        <div className="clean-cart">
                            <button onClick={handleClearCart}>Limpar Carrinho</button>
                            <TbWashDrycleanOff />
                        </div>
                    }
                    <br />
                    <div className="cart-contents">
                        {cart.length > 0 && cart.map((product) => <CartItem key={product.id} data={{ id: Number(product.id), imgUrl: product.imgUrl, name: product.name, price: product.price, quantity: product.quantity }} />)}
                    </div>
                    <div className="cart-resume">
                        <h3>Total</h3>
                        <h4>{formatPrice(parseFloat(totalPrice))}</h4>
                    </div>
                    <button className="cart-resume-title" onClick={() => { history.push('/checkout') }}>Finalizar</button>
                </section>
            }
        </>
    );
}
