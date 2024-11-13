
import React, { useContext } from 'react';
import './ProductCard.css';
import { MdAddShoppingCart } from "react-icons/md";
import { ProductContext } from '../../contexts/CartContext/ProductContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/PriceFormatter';
import { SignUpContext } from '../../contexts/SignUpContext/SignUpContext';

export function ProductCard({ data }) {
    const { imgUrl, name, price, id } = data;
    const { cart, setCart, maxQtd, cartQtd, setCartQtd } = useContext(ProductContext);
    const { logged } = useContext(SignUpContext);

    const handleAddToCart = () => {
        if (!logged) {
            alert('Você precisa estar logado para adicionar produtos ao carrinho');
            return;
        }
        const productExists = cart.some((item) => item.id === id);
        if (!productExists) {
            setCart([...cart, { ...data, quantity: 1 }]);
        } else {
            setCart(cart.map((item) => {
                if (item.id === id) {
                    setCartQtd(item.quantity)
                    if (item.quantity < maxQtd) {
                        item.quantity = cartQtd + 1
                        return item
                    }
                    return item
                }
            }));
        }
    }


    return (
        <section className="products-card" key={id}>
            <Link className="link-image" to={`/product/${id}`}>
                <img src={imgUrl} alt={name} className="card__image" />
            </Link>
            <div className="card-infos">
                <h2 className="card__price">{formatPrice(price)}</h2>
                <h2 className="card__title">{name}</h2>
            </div>
            <button type="button" className="card__button" onClick={handleAddToCart}>
                <MdAddShoppingCart />
            </button>
        </section>
    );
}

ProductCard.propTypes = {

    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imgUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired
    }).isRequired,
};

