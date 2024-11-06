// src/utils/formatPrice.js
export default function formatPrice(price) {
    return `R$ ${(parseFloat(price).toFixed(2))}`;
  }
