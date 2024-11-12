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

export const submitProductRating = async (userId, productId, rating, comment) => {
    const response = await api.post('/review', { userId, productId, rating, comment });
    if (response.status === 201) {
        const newAverage = await calculateAverageRating()
        const res = await api.patch(`/products/${productId}`, {
            ratingAverage: newAverage
        })
        return res
    }
};

const calculateAverageRating = async () => {
    const response = await api.get('/review');
    let average = 5
    const allRatings = []

    if (response.status === 200) {
        response.data.map((review) => {
            allRatings.push(review.rating)
        })
        average = (allRatings.reduce((a, b) => a + b)) / allRatings.length
    }
    return average
}
// const response = await api.patch(`/products/${productId}`, {
//     rating,
//     comment,
// });
export default api;
