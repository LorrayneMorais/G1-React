import React from 'react';
import ProductDetail from "...G1-React/src/components/product/ProductDetail";
import { useParams } from 'react-router-dom';

function ProductPage() {
  const { id } = useParams();

  return (
    <div>
      <ProductDetail productId={id} />
    </div>
  );
}

export default ProductPage;
