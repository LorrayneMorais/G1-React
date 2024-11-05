import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000/'
});

export const getCart = async () => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar o carrinho", error);
    }
}

export const postCart = async (cart) => {
    try {
        const response = await api.post('/cart', cart);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho", error);
    }
}