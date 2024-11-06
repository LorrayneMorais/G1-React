import React, { useState, useEffect } from 'react';

import '../../styles/ProductDetail.css';
import Rating from '../Rating/Rating';
import { formatPrice } from '../../utils/PriceFormatter';
import api from '../../api/api';

function ProductDetail({ productId }) {
  const [product, setProduct] = useState({});

  const getProduct = async (id) => {
    const response = await api.get(`/products/${id}`)
    if (response.status === 200) {
      setProduct(response.data);
      console.log(product)
    }
    else {
      return <p>Produto não encontrado.</p>;
    }
  }

  getProduct(productId)

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.imgUrl} alt={product.name} className="product-image" />
      <p>{product.description}</p>
      {/* <p>Preço: {formatPrice(product.price)}</p> */}
      <div>
        <h3>Avaliação Média: {product.avaliacao || product.review || 'Nenhuma avaliação ainda'}</h3>
      </div>

      {/* Componente de Avaliação */}
      <Rating productId={product.id} />
    </div>
  );
}

export default ProductDetail;
