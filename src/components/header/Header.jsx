import React, { useContext } from 'react';
import { CartButton } from '../Cart/CartButton/CartButton';
import './Header.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { ProductContext } from '../../contexts/CartContext/ProductContext';
import { SearchBar } from '../SearchBar/SearchBar'

const Header = () => {
    const { isMenuVisible, setIsMenuVisible } = useContext(ProductContext);
    return (
        <header className="container-header">
            <div className="header-search">
                <button onClick={() => setIsMenuVisible(!isMenuVisible)} className="header-categoria">
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