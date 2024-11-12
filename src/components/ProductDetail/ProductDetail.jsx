import React, { useContext, useEffect, useState } from 'react';
import { getProductById } from '../../api/api';
import './ProductDetail.css'
import { formatPrice } from '../../utils/PriceFormatter';
import Rating from '../Rating/Rating';
import { ProductContext } from '../../contexts/CartContext/ProductContext'

function ProductDetail({ productId }) {
  const { products } = useContext(ProductContext)
  const [product, setProduct] = useState({});

  const getProduct = async (id) => {
    const response = await getProductById(id);
    setProduct(response);
  };

  useEffect(() => {
    getProduct(productId);
  }, []);

  useEffect(() => {
    getProduct(productId);
  }, [products]);

  const ratingFormated = Number(product.ratingAverage).toFixed(2)

  return (
    <div className="product-detail">
      <h1>{product.name}</h1>
      <img src={product.imgUrl} alt={product.name} className="product-image" />
      <p>{product.description}</p>
      {<p>Preço: {formatPrice(product.price)}</p>}
      <div>
        <h3>Avaliação Média: {ratingFormated || 'Nenhuma avaliação ainda'}</h3>
      </div>
      <Rating productId={product.id} />
    </div>
  );
}


export default ProductDetail;