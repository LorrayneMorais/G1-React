import React, { useContext } from 'react';

import '../../styles/ProductDetail.css';
import Rating from '../Rating/Rating';
import { formatPrice } from '../../utils/PriceFormatter';

import { ProductContext } from '../../contexts/CartContext/ProductContext';
import { ProductCard } from '../product/ProductCard';

function ProductDetail({ productId }) {
 /* const [product, setProduct] = useState({});*/
  const {products} = useContext(ProductContext);

  /*const getProduct = (id) => {
    alert('Produto encontrado');
    products.map((item) => {
      if (item.id == id) {
        setProduct(product);
  }
});

  getProduct(productId)*/

  return (
<div className="product-detail">
  {
  products.filter(product => product.id == productId).map(product => (
    <ProductCard key={product.id}
      data={{id:Number(product.id), imgUrl: product.imgUrl, name: product.name, price: product.price }}
    />
  ))
  }
</div>
  );
}


export default ProductDetail;