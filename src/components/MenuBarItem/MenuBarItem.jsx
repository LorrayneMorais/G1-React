import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './MenuBarItem.css';
import { ProductContext } from '../../contexts/CartContext/ProductContext';


export function MenuBarItem() {
    const { products, setProducts, setFilteredProducts } = useContext(ProductContext);
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
            setFilteredProducts(filteredProducts);
        }
    };

    useEffect(() => {
        if (shouldFilter) {
            filterProductsByCategory();
            setShouldFilter(false);
        }
        if (categoryFilter.length === 0) {
            setFilteredProducts([]);
        }
    }, [categoryFilter, shouldFilter]);

    useEffect(() => {
        handleProductsCategories();
    }, [products]);

    const renderCategories = () => {
        return categories.map((category, index) => {
            return (
                <div className="menu-categories" key={index}>
                    <label htmlFor={category}>{category}</label>
                    <input type="checkbox" id={category}
                        onChange={handleCategoryFilter} />
                </div>
            )
        })
    }

    return (
        <section>
            <div className="menu-item-search">
                <input type="text" placeholder="Procurar por gênero" />
                <button className="menu-item-icon-search">
                    <FaSearch />
                </button>
            </div>
            <br />
            <div>
                {renderCategories()}
            </div>
        </section>
    );
}
