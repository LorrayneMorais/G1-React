import React, { useContext } from 'react';
import { CartButton } from '../Cart/CartButton/CartButton';
import './Header.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { RxHamburgerMenu } from "react-icons/rx";
import { ProductContext } from '../../contexts/CartContext/ProductContext';

const Header = () => {
    const { isMenuVisible, setIsMenuVisible } = useContext(ProductContext);
    return (
        <header className="container-header">
            <div className="header-search">
                <button onClick={() => setIsMenuVisible(!isMenuVisible)}className="header-categoria">
                    <RxHamburgerMenu />
                </button>
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