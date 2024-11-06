import React, { useState, useEffect, useContext } from 'react';
import "./Final.css";
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { ProductContext } from '../../contexts/CartContext/ProductContext';

export function Final() {
    const { id: userId } = useParams();
    const [orders, setOrders] = useState([]);
    const { loading, setLoading } = useContext(ProductContext); // Usando o loading do contexto
    const [error, setError] = useState(null); // Para tratar erros

    // Função para buscar os pedidos do usuário
    useEffect(() => {
        const getOrders = async () => {
            try {
                setLoading(true); // Inicia o carregamento
                const response = await api.get(`/orders?userId=${userId}`);
                if (response.data && Array.isArray(response.data)) {
                    setOrders(response.data); // Atualiza o estado com os dados dos pedidos
                } else {
                    setError('Nenhum pedido encontrado ou resposta inválida.');
                }
            } catch (err) {
                setError('Erro ao carregar os pedidos!'); // Se houver erro, armazena a mensagem
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        getOrders(); // Chama a função para obter os pedidos
    }, [userId, setLoading]); // O efeito será executado sempre que o userId mudar

    if (loading) {
        return <p>Carregando...</p>; // Exibe mensagem enquanto os dados estão sendo carregados
    }

    if (error) {
        return <p>{error}</p>; // Exibe mensagem de erro, caso haja algum
    }

    return (
        <div className="container-final">
            <h2>Finalização da compra!</h2>
            {orders.length === 0 ? (
                <p>Não há pedidos para exibir.</p> // Caso não haja pedidos
            ) : (
                orders.map((order) => (
                    <div key={order.id}>
                        <div className="container-final2">
                            {/* Aqui você pode adicionar informações adicionais sobre o pedido */}
                        </div>

                        <div className="container-final2">
                            <p>Ítens do carrinho</p>
                            {order.products.map((product) => (
                                <div key={product.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <img
                                        src={product.imgUrl}
                                        alt={product.name}
                                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                    />
                                    <div>
                                        <p><strong>Nome:</strong> {product.name}</p>
                                        <p><strong>Preço:</strong> R${product.price}</p>
                                        <p><strong>Quantidade:</strong> {product.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="container-final2">
                            <p><strong>Valor total:</strong> R${order.total}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
