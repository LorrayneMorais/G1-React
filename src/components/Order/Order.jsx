import React from "react";
import PropTypes from 'prop-types';
import { formatPrice } from "../../utils/PriceFormatter";
export function Order({ id, total, products }) {

    return (
        <>
            <div className="container-final">
                <div>
                    <p>Pedido ID: {id}</p>

                    {products.map((product) => (
                        <div key={product.id}>
                            <img
                                src={product.imgUrl}
                                alt={product.name}
                            />
                            <p>{product.name}</p>
                            <p>Preço:{formatPrice(product.price)}</p>
                            <p>Quantidade:{product.quantity}</p>
                        </div>
                    ))}
                    <p>Total: {formatPrice(total)}</p>
                </div>
            </div>
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

