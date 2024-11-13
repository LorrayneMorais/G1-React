import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './MenuBarItem.css';
import { ProductContext } from '../../contexts/CartContext/ProductContext';

export function MenuBarItem() {
    const { products, setProducts, setFilteredProducts } = useContext(ProductContext);
    const [categories, setCategories] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [shouldFilter, setShouldFilter] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);

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
    const handleCategorySearch = () => {
        const categoriesView = categories.filter((category) => {
            if (category.toLowerCase().includes(searchValue.trim().toLowerCase())) {
                return category
            }
        })
        setSearchResult(categoriesView);
    }
    const handleButtonSearch = () => {
        if (searchResult.length === 0) {
            alert('Nenhuma categoria encontrada')
        }
    }
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

    useEffect(() => {
        handleCategorySearch();
    }, [searchValue]);

    const renderCategories = (categoriesToRender) => {
        return categoriesToRender.map((category, index) => {
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
                <input type="text" placeholder="Procurar por gênero" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                <div className="menu-item-button-container" >
                    <button type="submit" className="menu-item-button-search" onClick={handleButtonSearch}>
                        <FaSearch className="menu-item-icon-search" />
                    </button>
                </div>
            </div>
            <br />
            <div>
                {searchResult.length === 0 ? renderCategories(categories) : renderCategories(searchResult)}
            </div>
        </section>
    );
}
