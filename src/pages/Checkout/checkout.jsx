import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./checkout.css";

export default function Checkout() {
    const { id } = useContext(AuthContext);
    const history = useHistory();
    
    const [cart, setCart] = useState([]);
    const [form, setForm] = useState({
        cardNumber: "",
        cardName: "",
        cardDate: "",
        cardCVV: "",
        installments: 1,
    });

    const fetchCartItems = async () => {
        try {
            const { data, status } = await api.get('/cart');
            if (status === 200) setCart(data);
            else alert('Erro ao buscar itens');
        } catch (error) {
            console.error("Erro ao buscar itens:", error);
            alert("Erro ao buscar itens do carrinho");
        }
    };

    const totalPayment = () => cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const handleInputChange = ({ target: { name, value } }) => {
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleCheckout = async () => {
        const invoice = {
            idUser: id,
            valorTotal: totalPayment(),
            itens: cart.map(({ id, quantity }) => ({ idProduto: id, quantidade: quantity })),
        };

        try {
            const { status } = await api.post('/invoices', invoice);
            if (status === 200) {
                alert("Compra realizada com sucesso!");
                history.push(`/user/${id}`);
            }
        } catch (error) {
            console.error("Erro ao realizar o pagamento:", error);
            alert("Erro ao realizar o pagamento");
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const [isButtonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        const validateForm = () => (
            form.cardNumber.length === 16 &&
            form.cardName.length >= 3 &&
            new Date(form.cardDate) > new Date() &&
            form.cardCVV.length === 3
        );
        setButtonDisabled(!validateForm());
    }, [form]);

    return (
        <>
            <Header />
            <section className="checkout-section">
                <form className="card-form">
                    <input
                        type="text"
                        placeholder="Número do cartão"
                        name="cardNumber"
                        value={form.cardNumber}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Nome(como está escrito no cartão)"
                        name="cardName"
                        value={form.cardName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="date"
                        placeholder="Data de validade"
                        name="cardDate"
                        value={form.cardDate}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="CVV"
                        name="cardCVV"
                        value={form.cardCVV}
                        onChange={handleInputChange}
                    />
                    <select name="installments" value={form.installments} onChange={handleInputChange}>
                        {[...Array(6)].map((_, i) => (
                            <option key={`installment-${i + 1}`} value={i + 1}>
                                {i + 1}x de R$ {(totalPayment() / (i + 1)).toFixed(2)}
                            </option>
                        ))}
                    </select>
                    <button type="button" disabled={isButtonDisabled} onClick={handleCheckout}>
                        Finalizar compra
                    </button>
                </form>
                
                <div className="cart-confirmation">
                    <h2>Confirmação de compra</h2>
                    {cart.map(({ id, name, price, quantity }) => (
                        <div key={id} className="cart-sec">
                            <p>{name}</p>
                            <div>
                                <p>R$ {(price * quantity).toFixed(2)}</p>
                                <p>Quantidade: {quantity}</p>
                            </div>
                        </div>
                    ))}
                    <p>Valor total: R$ {totalPayment()}</p>
                </div>
            </section>
            <Footer />
        </>
    );
}