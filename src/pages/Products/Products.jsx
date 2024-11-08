import React, { useContext, useEffect, useState } from 'react';
import './Products.css';
import { ProductCard } from '../../components/product/ProductCard';
import api from '../../api/api';
import { ProductContext } from '../../contexts/CartContext/ProductContext';
import { Loading } from '../../components/Loading/Loading';
import  Header from '../../components/header/Header'
import  Footer  from '../../components/footer/Footer';
import { Cart } from '../Cart/Cart';
import { MenuBar } from '../MenuBar/MenuBar';

export function Products() {
const { products, setProducts, loading, setLoading } = useContext(ProductContext);

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
    <Header />
    <Cart />
    <MenuBar />
    <section className="products container">
        {products.map((product) => (
            product.quantity > 0 && (
                <ProductCard key={product.id}
                data={{id:Number(product.id), imgUrl: product.imgUrl, name: product.name, price: product.price }}
                />
            )
        ))}
    </section>
    <Footer />
    </div>
    );
}

