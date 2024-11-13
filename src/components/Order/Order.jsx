import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from "../../utils/PriceFormatter";
import './OrderStyle.css';
export function Order({ id, total, products }) {

    return (
        <>
            <section className="container-final">
                <div className="title-order">
                    <p>Pedido ID: {id}</p>
                </div>
                <div className="container-all-info">
                    {products.map((product) => (
                        <div key={product.id} className="container-card-info">
                            <div className="card-image-info">
                                <img
                                    src={product.imgUrl}
                                    alt={product.name}
                                />
                            </div>
                            <div className="card-final-info">
                                <span>{product.name}</span>
                                <span>Quantidade: {product.quantity}</span>
                                <span>Preço: {formatPrice(product.price)}</span>
                            </div>
                        </div>
                    ))}
                    <div className="card-final-info-total">
                        <span>Total do pedido: {formatPrice(total)}</span>
                    </div>
                </div>
            </section>
        </>

    );
}

Order.propTypes = {
    id: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            imgUrl: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ).isRequired,
};

