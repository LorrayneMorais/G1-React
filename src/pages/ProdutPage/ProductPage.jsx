import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../../components/ProductDetail/ProductDetail';

function ProductPage() {
  const { produtoId } = useParams();

  return (
    <div>
      {/* teste */}
      <ProductDetail productId={Number(produtoId)} />
    </div>
  );
}

export default ProductPage;
