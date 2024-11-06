import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/ProductDetail/ProductDetail';

function ProductPage() {
  const { id } = useParams();

  return (
    <div>
      <ProductDetail productId={id} />
    </div>
  );
}

export default ProductPage;
