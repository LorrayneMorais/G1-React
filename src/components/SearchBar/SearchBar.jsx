import React, { useContext, useEffect, useState } from 'react';
import './SearchBar.css';
import { IoSearchOutline } from "react-icons/io5";
import { ProductContext } from '../../contexts/CartContext/ProductContext';
export function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const { products, setFilteredProducts } = useContext(ProductContext);
    const handleFilterProducts = () => {
        try {
            const response = products.filter((product) => product.name.toLowerCase().includes(searchValue.trim().toLowerCase()));
            console.log(response);

            setFilteredProducts(response);
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
        }
        const tempValue = searchValue.trim();
        if (tempValue === '') {
            setFilteredProducts([]);
        }
    }

    useEffect(() => {
        handleFilterProducts()
    }, [searchValue]);



    return (

        <form onSubmit={handleFilterProducts} >
            <div className="form-div">
                <input
                    value={searchValue}
                    type='search'
                    placeholder='Procure um livro'
                    className="search__input"
                    onChange={(e) => setSearchValue(e.target.value)}
                    required
                />
                <button type='submit' className="search__button">
                    <IoSearchOutline />
                </button>
            </div>
        </form>
    );
}