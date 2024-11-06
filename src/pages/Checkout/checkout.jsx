import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/api";
import "./Checkout.css";
import { ProductContext } from "../../contexts/CartContext/ProductContext";
import { SignUpContext } from "../../contexts/SignUpContext/SignUpContext";

export function Checkout() {
    const { cart, products } = useContext(ProductContext);
    const { email } = useContext(SignUpContext)
    const [user, setUser] = useState({});
    const history = useHistory();

    const getUserByEmail = async () => {
        const response = await api.get(`/users?email=${email}`);
        if(response.data.length===0){
            alert("User not found")
        }
        setUser(response.data[0]);
    };
    getUserByEmail()

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

    const handleFinal = async () => {
        let qtd = 0
        let finalPrice = 0
        cart.map(async (item) => {
            console.log(item);

            products.map(async (product) => {
                if (product.id == item.id) {
                    qtd = product.quantity - item.quantity
                    product.quantity = qtd
                    finalPrice += product.price * item.quantity
                    const response = await api.patch(`/products/${item.id}`, { quantity: qtd })
                }
            })
        })
        await api.post('/orders', {
            userId: user.id,
            products: cart,
            total: finalPrice
        })
        history.push(`/final/${user.id}`)
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
                    <button className="finish-button" type="button" onClick={handleFinal}>
                        Finalizar compra
                    </button>
                </form>
            </section>
        </>
    );
}