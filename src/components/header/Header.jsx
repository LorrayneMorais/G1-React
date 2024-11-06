import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <p>Logo</p>
            </div>
            <nav className="nav-links">
                <a href="#home">Início</a>
                <a href="#produtos">Produtos</a>
                <a href="#sobre">Sobre-nós</a>
            </nav>
            <div className="cart-icon">
                <i className="fas fa-shopping-cart"></i>
            </div>
        </header>
    );
};

export default Header;