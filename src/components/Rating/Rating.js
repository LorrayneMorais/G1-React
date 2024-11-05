import React, { useState } from 'react';
import { submitProductRating } from '../../api/api';

function Rating({ productId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRatingSubmit = async () => {
    if (rating === 0) return alert('Por favor, selecione uma avaliação.');

    try {
      await submitProductRating(productId, rating, comment);
      setSuccessMessage('Avaliação enviada com sucesso!');
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  return (
    <div className="rating">
      <h3>Avalie o Produto</h3>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            className={star <= rating ? 'selected' : ''}
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
      <button onClick={handleRatingSubmit}>Enviar Avaliação</button>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default Rating;
