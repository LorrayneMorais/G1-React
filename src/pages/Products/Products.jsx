import React, { useContext, useEffect } from 'react';
import './Products.css';
import { ProductCard } from '../../components/product/ProductCard';
import { getAllProducts } from '../../api/api';
import { ProductContext } from '../../contexts/CartContext/ProductContext';
import { Loading } from '../../components/Loading/Loading';
import Header from '../../components/header/Header'
import  Footer  from '../../components/footer'
import { Cart } from '../Cart/Cart';
import { MenuBar } from '../MenuBar/MenuBar';
// import { BsHandIndexThumb } from 'react-icons/bs';
//test

export function Products() {
    const { products, setProducts, loading, setLoading, filteredProducts } = useContext(ProductContext);

    const handleProductsRequest = async () => {
        const response = await getAllProducts();
        if (response) {
            const fetchedProducts = response;
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
    }

    useEffect(() => {
        handleProductsRequest()
    }, []);


    return (
        (loading) ? <Loading /> :
            <div>
                <header className='header-products'>
                    <Header />
                    <Cart />
                    <MenuBar />
                </header>
                {filteredProducts.length > 0 ? (
                    <section className="products container">
                        {filteredProducts.map((product) => (
                            product.quantity > 0 && (
                                <ProductCard key={product.id}
                                    data={{ id: Number(product.id), imgUrl: product.imgUrl, name: product.name, price: product.price }}
                                />
                            )
                        ))}
                    </section>
                ) : (
                    <section className="products container">
                        {products.map((product) => (
                            product.quantity > 0 && (
                                <ProductCard key={product.id}
                                    data={{ id: Number(product.id), imgUrl: product.imgUrl, name: product.name, price: product.price, quantity: product.quantity }}
                                />
                            )
                        ))}
                    </section>
                )
                }
                <footer className='footer-products'>
                    <Footer />
                </footer>
            </div >
    );
}

