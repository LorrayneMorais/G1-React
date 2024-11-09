import React, { useContext, useEffect, useState } from 'react';
import './MenuBar.css';
import { MenuBarItem } from '../../components/MenuBarItem/MenuBarItem';
import { RxHamburgerMenu } from "react-icons/rx";
import { ProductContext } from '../../contexts/CartContext/ProductContext';

export function MenuBar() {
    const { isMenuVisible, setIsMenuVisible, products, setProducts } = useContext(ProductContext);
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [shouldFilter, setShouldFilter] = useState(false);

    const handleCategoryFilter = (event) => {
        const category = event.target.id;
        if (event.target.checked) {
            setCategoryFilter([...categoryFilter, category]);
        } else {
            setCategoryFilter(categoryFilter.filter((c) => c !== category));
        }
        setShouldFilter(true);
    };

    const handleProductsCategories = () => {
        const categories = products.map((product) => product.category);
        const uniqueCategories = [...new Set(categories)];
        setCategories(uniqueCategories);
    };

    const filterProductsByCategory = () => {
        if (categoryFilter.length === 0) {
            setProducts(products);
        } else {
            const filteredProducts = products.filter((product) =>
                categoryFilter.includes(product.category)
            );
            setProducts(filteredProducts);
        }
    };

    useEffect(() => {
        if (shouldFilter) {
            filterProductsByCategory();
            setShouldFilter(false);
        }
    }, [categoryFilter, shouldFilter]);

    useEffect(() => {
        handleProductsCategories();
    }, [products]);

    return (
        <>
            <section className={`menu ${isMenuVisible ? 'menu--active' : ''}`}>
                <div className="menu-title">
                    <button onClick={() => setIsMenuVisible(!isMenuVisible)} className="menu-icon">
                        <RxHamburgerMenu />
                    </button>
                    <h1>menu de opções</h1>
                </div>
                <div>
                    <MenuBarItem
                        categories={categories}
                        handleCategoryFilter={handleCategoryFilter}
                        filter={categoryFilter}
                    />
                </div>
            </section>
        </>
    );
}