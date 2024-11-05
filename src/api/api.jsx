import axios from 'axios';

const API = import.meta.env.API_URL;

export const api = axios.create({
  baseURL: API,
});

export const getAllProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

/**
 * Envia uma avaliação para um produto específico.
 * @param {number} productId 
 * @param {number} rating 
 * @param {string} comment 
 * @returns {Object} 
 */
export const rateProduct = async (productId, rating, comment = '') => {
  const response = await api.post(`/products/${productId}/rate`, {
    rating,
    comment,
  });
  return response.data;
};
