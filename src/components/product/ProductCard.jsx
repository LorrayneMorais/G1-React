import React, { useContext } from 'react';
import './ProductCard.css';
import { MdAddShoppingCart } from "react-icons/md";
import { ProductContext } from '../../contexts/CartContext/ProductContext';
import PropTypes, { object } from 'prop-types';

export function ProductCard({ data }) {
    const { imgUrl, name, price, id } = data;
    const { cart, setCart } = useContext(ProductContext);

    const handleAddToCart = () => {
        // Evitar adicionar o mesmo produto várias vezes no carrinho
        console.log(cart[0]);
        const productExists = cart.some((product) => product.id === id);
        if (!productExists) {
            setCart([...cart, { ...data, quantity: 1 }]);
        }else{
            setCart(cart.map((product) => {
                if(product.id === id) {
                    return {...product, quantity: product.quantity + 1}
                }
                return product;
            }));
        }
    }

    return (
        <section className="products-card" key={id}>
            <img src={imgUrl} alt={name} className="card__image" />
            <div className="card-infos">
                <h2 className="card__price">{price}</h2>
                <h2 className="card__title">{name}</h2>
            </div>
            <button type="button" className="card__button">
                <MdAddShoppingCart onClick={handleAddToCart} />
            </button>
        </section>
    )
}

ProductCard.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imgUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};