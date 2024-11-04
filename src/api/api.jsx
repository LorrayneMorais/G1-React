import axios from 'axios';

const API = import.meta.env.API_URL;

export const api = axios.create({
    baseURL: API,});