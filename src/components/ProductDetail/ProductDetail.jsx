import React, { useState } from 'react';
import { getProductById } from '../../api/api';
import './ProductDetail.css'
import { formatPrice } from '../../utils/PriceFormatter';
import Rating from '../Rating/Rating';

function ProductDetail({ productId }) {
  const [product, setProduct] = useState({});

  const getProduct = async (id) => {
    const response = await getProductById(id);
    setProduct(response);
  };

  getProduct(productId)

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.imgUrl} alt={product.name} className="product-image" />
      <p>{product.description}</p>
      {<p>Preço: {formatPrice(product.price)}</p>}
      <div>
        <h3>Avaliação Média: {product.avaliacao || product.review || 'Nenhuma avaliação ainda'}</h3>
      </div>
      <Rating productId={product.id} />
    </div>
  );
}


export default ProductDetail;