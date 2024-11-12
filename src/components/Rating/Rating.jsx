import React, { useContext, useState } from 'react';
import { submitProductRating } from '../../api/api';
import { SignUpContext } from '../../contexts/SignUpContext/SignUpContext'
import { ProductContext } from '../../contexts/CartContext/ProductContext';

function Rating({ productId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId } = useContext(SignUpContext);
  const { products, setProducts } = useContext(ProductContext)
  const handleRatingSubmit = async () => {

    if (rating === 0) return alert('Por favor, selecione uma avaliação.');

    setIsSubmitting(true);
    try {
      const response = await submitProductRating(userId, productId, rating, comment);
      setProducts(products.map((product) => product.id === productId ? response.data : product));
      setSuccessMessage('Avaliação enviada com sucesso!');
      setRating(0);
      setComment('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
      alert('Houve um erro ao enviar sua avaliação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rating">
      <h3>Avalie o Produto</h3>
      <div className="stars" role="radiogroup" aria-label="Escolha sua avaliação">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={star <= rating ? 'selected' : ''}
            role="radio"
            aria-checked={star === rating}
            aria-label={`${star} estrelas`}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Escreva um comentário..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button onClick={handleRatingSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar Avaliação'}
      </button>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default Rating;
