import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const getAllProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

export const submitProductRating = async (productId, rating, comment = '') => {
    const response = await api.post(`/products/${productId}/rate`, {
        rating,
        comment,
    });
    return response.data;
};

export default api;
