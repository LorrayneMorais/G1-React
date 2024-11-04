import axios from 'axios';

const API = import.meta.env.API_URL;

export const api = axios.create({
    baseURL: API,});


export const getAllProducts = async () => {
    const response = await api.get('/products');
    return response.data;
}

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
}