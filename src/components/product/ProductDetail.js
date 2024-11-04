import React, { useState, useEffect } from 'react';
import Rating from './Rating';
import { fetchProductById } from '../../api/api';
import '../../styles/ProductDetail.css';
import formatPrice from '../../utils/formatPrice';

function ProductDetail({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error('Erro ao carregar o produto:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  if (loading) return <p>Carregando...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <div className="product-detail">
      <h1>{product.nome}</h1>
      <img src={product.imgUrl} alt={product.nome} className="product-image" />
      <p>{product.descricao}</p>
      <p>Preço: {formatPrice(product.preco)}</p>
      <div>
        <h3>Avaliação Média: {product.avaliacao || 'Nenhuma avaliação ainda'}</h3>
      </div>

      {/* Componente de Avaliação */}
      <Rating productId={product.id} />
    </div>
  );
}

export default ProductDetail;
