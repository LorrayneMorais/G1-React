// import React, { useContext } from 'react';
// import { ProductContext } from '../../contexts/CartContext/ProductContext';

import React from 'react';
import { FaSearch } from "react-icons/fa";
import './MenuBarItem.css';


export function MenuBarItem({categories, handleCategoryFilter, filter}) {
    // MenuBar fazer funcao handleCategroyFilter (array de categorias)
    //Vou passar as handleCategoryFilter como props

    const renderCategories = () => {
        return categories.map((category, index) => {
            return (
                <div className="menu-categories" key={index}>
                    <label htmlFor={category}>{category}</label>
                    <input type="checkbox" id={category} onChange={()=> {handleCategoryFilter}} value={filter}/>
                </div>
            )
        })
    }


    return (
        <>
            <section>
                <div className="menu-item-search">
                    <input type="text" placeholder="Procurar por gênero"/>
                    <button className="menu-item-icon-search">
                        <FaSearch />
                    </button>
                </div>
                <br />
                <div>
                    {renderCategories()}
                </div>
            </section>
        </>
    );
}
