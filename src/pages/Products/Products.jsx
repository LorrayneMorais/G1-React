import React, {useContext} from 'react';
import './Products.css';

import { ProductCard } from '../../components/product/ProductCard';
import api from '../../api/api';
import { ProductContext } from '../../contexts/CartContext/ProductContext';





export function Products() {

    const {products,setProducts} = useContext(ProductContext);

    getAllProducts(setProducts);

    return (
        <section className="products container">
            {products.map((product) => <ProductCard data={{imgUrl:product.imgUrl, name:product.name, price:product.price}} />)}
        </section>
    )
}

const getAllProducts = async (setProducts) => {
    const response = await api.get('/products');
    if(response.status === 200){
        setProducts(response.data);
    }else{
        console.log('Error');
    }
}