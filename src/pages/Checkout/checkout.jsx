import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/api";
import "./Checkout.css";
import { ProductContext } from "../../contexts/CartContext/ProductContext";

export function Checkout() {
    const { id, cart, setProducts } = useContext(ProductContext);
    const history = useHistory();

    const [form, setForm] = useState({
        cardNumber: "",
        cardName: "",
        cardDate: "",
        cardCVV: "",
        installments: 1,
    });

    const fetchCartItems = async () => {
        cart.map((item) => { item })
    };

    const totalPayment = () => cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const handleInputChange = ({ target: { name, value } }) => {
        setForm(prevForm => ({ ...prevForm, [name]: value }));
    };

    const handleCheckout = async () => {
        const invoice = {
            idUser: id,
            valorTotal: totalPayment(),
            itens: cart.map(({ id, quantity }) => ({ idProduto: id, quantidade: quantity }))
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
        history.push('/final');
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

    const handleFinal = () => {
       cart.map(async(item) => {
            const response = await api.patch(`/products/${item.id}`,{quantity:item.quantity})   
       }) 
    }

    return (
        <>
            <section className="checkout-section">
                <div className="cart-confirmation">
                    <h2>Confirmação dos itens</h2>
                    <div className="books-container">
                        {cart.map(({ id, name, price, quantity, imgUrl }) => (
                            <div key={id} className="cart-sec">
                                <img src={imgUrl} alt="" />
                                <p>{name}</p>
                                <div className="quantity-price">
                                    <p>Quantidade: {quantity}</p>
                                    <p>Total: R$ {(price * quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                        <p>Valor total: R$ {totalPayment()}</p>
                    </div>
                </div>
                <div className="card-form-title"><h2>Confirmação do pagamento:</h2></div>
                <form className="card-form">
                    <div className="input-container">
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
                    </div>
                    <select className="installments " name="installments" value={form.installments} onChange={handleInputChange}>
                        {[...Array(6)].map((_, i) => (
                            <option key={`installment-${i + 1}`} value={i + 1}>
                                {i + 1}x de R$ {(totalPayment() / (i + 1)).toFixed(2)}
                            </option>
                        ))}
                    </select>
                    <button className="finish-button" type="button" disabled={isButtonDisabled} onClick={handleCheckout}>
                        Finalizar compra
                    </button>
                </form>
            </section>
        </>
    );
}