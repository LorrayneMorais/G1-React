import React, { useContext, useState } from 'react';
import './SearchBar.css';
import { IoSearchOutline } from "react-icons/io5";
import { ProductContext } from '../../contexts/CartContext/ProductContext';
import api from '../../api/api';
export function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const { setProducts } = useContext(ProductContext);

    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await api.get(`/products?name=${searchValue}`);
            setProducts(response.data);
            setSearchValue(''); // Atualiza o estado com os dados da resposta
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
        }
    };


    return (

    <form onSubmit={handleSearch} >
        <div className="form-div">
            <input
            value={searchValue}
            type='search'
            placeholder='Procure um livro'
            className="search__input"
            onChange={({target}) => setSearchValue(target.value) }
            required
            />
            <button type='submit' className="search__button">
                <IoSearchOutline />
            </button>
        </div>
    </form>
    );
}