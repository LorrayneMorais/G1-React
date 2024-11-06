import React from 'react';
import { CartButton } from '../Cart/CartButton/CartButton';
import './Header.css';
import { SearchBar } from '../SearchBar/SearchBar';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <SearchBar />
                </div>
                <CartButton />
            </div>
        </header>
    );
};

export default Header;