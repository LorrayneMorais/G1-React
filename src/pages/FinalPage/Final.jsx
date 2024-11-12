import { Order } from '../../components/Order/Order';
import './Final.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { formatPrice } from '../../utils/PriceFormatter';
// import { ProductContext } from '../../contexts/CartContext/ProductContext';

export function Final() {
    const { id: userId } = useParams();
    const [orders, setOrders] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await api.get(`/orders?userId=${userId}`);
                console.log(response);

                if (response.data.length > 0) {
                    setOrders(response.data);
                    console.log(response.data);
                } else {
                    setError('Nenhum pedido encontrado ou resposta inválida.');
                }
            } catch (err) {
                setError('Erro ao carregar os pedidos!');
            }
        };

        getOrders();
    }, []);


    return (
        <section>
            <div>
                <button onClick={() => history.push('/')}>Voltar</button>
            </div>
            <h1>Meus Pedidos</h1>
            {orders.map((order) => (
                <Order key={order.id} id={order.id} total={order.total} products={order.products} />
            ))}
        </section>
    );
}
