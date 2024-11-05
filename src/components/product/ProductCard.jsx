import React, { useContext } from 'react';
import './ProductCard.css';
import { ProductContext } from '../../contexts/CartContext/ProductContext';
import api from '../../api/api';
import propTypes from 'prop-types';
import { MdAddShoppingCart } from "react-icons/md";

export function ProductCard({data}) {
    const {imgUrl, name, price} = data;



    return (
        <section className="products-card">
            <img src={imgUrl} alt={name} className="card__image"/>
            <div className="card-infos">
                <h2 className="card__price">{price}</h2>
                <h2 className="card__title">{name}</h2>
            </div>
        <button type="button" className="card__button">
            <MdAddShoppingCart />
        </button>
        </section>
    )
}

ProductCard.protoTypes = {
    data: propTypes.shape({}),
}.isRequired;


/*
const getAllProducts = async (setProducts) => {
    const response = await api.get('/products');
    if(response.status === 200){
        setProducts(response.data);
    }else{
        console.log('Error');
    }
}*/