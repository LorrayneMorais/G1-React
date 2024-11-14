import React, { useContext, useEffect, useState } from 'react';
import { getProductById } from '../../api/api';
import './ProductDetail.css'
import { formatPrice } from '../../utils/PriceFormatter';
import Rating from '../Rating/Rating';
import { ProductContext } from '../../contexts/CartContext/ProductContext'
import  Footer  from '../Footer/Footer.jsx';

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
      <div style={{width:'100%', justifyContent:'left'}}>
        <button className="button-home-back" onClick={() => window.history.back()}>Voltar</button>
      </div>

      <section className="product-section-card">
        <div  className="product-image-card">
          <img src={product.imgUrl} alt={product.name} className="product-image" />
        </div>
        <div  className="product-description-card">
          <h1 className="product-card-title">{product.name}</h1>
          <div  className="product-info-card">
            <p>{product.description}</p>
            {<p style={{fontWeight:'bolder'}}>Preço: {formatPrice(product.price)}</p>}
            <span className='card-avarege'>Avaliação Média: {ratingFormated || 'Nenhuma avaliação ainda'}</span>
          </div>
        </div>
        <Rating productId={product.id} />
      </section>
      <footer className='product-detail-footer'>
        <Footer  />
      </footer>
    </div>
  );
}


export default ProductDetail;