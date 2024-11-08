import React from 'react';
import { CartButton } from '../Cart/CartButton/CartButton';
import './Header.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { RxHamburgerMenu } from "react-icons/rx";

const Header = () => {
    return (
        <header className="container-header">
            <div className="header-search">
                <div className="header-categoria">
                    <RxHamburgerMenu />
                </div>
                <div>
                    <SearchBar />
                </div>
            </div>
            <div className="header-user">
                <div >
                    login
                </div>
                <div>
                    <CartButton />
                </div>
            </div>
        </header>
    );
};

export default Header;