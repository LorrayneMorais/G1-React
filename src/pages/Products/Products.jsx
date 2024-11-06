import React, { useContext, useEffect, useState } from 'react';
import './Products.css';
import { ProductCard } from '../../components/product/ProductCard';
import api from '../../api/api';
import { ProductContext } from '../../contexts/CartContext/ProductContext';
import { Loading } from '../../components/Loading/Loading';
import { Cart } from '../Cart/Cart';

export function Products() {
const { products, setProducts } = useContext(ProductContext);
const [loading, setLoading] = useState(true);

useEffect(() => {
    const getAllProducts = async () => {
        const response = await api.get('/products');
        if (response.status === 200) {
            const fetchedProducts = response.data;

            // Evitar duplicação de produtos no estado
            setProducts((prevProducts) => {
                const newProducts = fetchedProducts.filter(
                    (product) => !prevProducts.some((p) => p.id === product.id)
                );
                return [...prevProducts, ...newProducts];
            });

            setLoading(false);
        } else {
            console.log('Error');
        }
    };

    getAllProducts();
}, [setProducts]);

return (
    (loading) ? <Loading /> :
    <div>
    <Cart />
    <section className="products container">
        {products.map((product) => (
            <ProductCard key={product.id}
            data={{id:product.id, imgUrl: product.imgUrl, name: product.name, price: product.price }}
            />
        ))}
    </section>
    </div>
    );
}