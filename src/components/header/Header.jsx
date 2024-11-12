import React, { useContext } from 'react';
import { CartButton } from '../Cart/CartButton/CartButton';
import './Header.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { ProductContext } from '../../contexts/CartContext/ProductContext';
import { SearchBar } from '../SearchBar/SearchBar'
import { FaRegUser } from "react-icons/fa";
import { SignUpContext } from '../../contexts/SignUpContext/SignUpContext';
import { Link } from 'react-router-dom/cjs/react-router-dom';


const Header = () => {
    const { isMenuVisible, setIsMenuVisible } = useContext(ProductContext);
    const { name, userId, logged } = useContext(SignUpContext);
    

    
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
                <div className="user-boneco">
                    <FaRegUser style={{fontSize:'26px'}}/>
                    {logged? <span>{name}</span> : <Link className="signin-buttom-link" to='/'>SignIn</Link>
                    }
                </div>
                <div>
                    <CartButton />
                </div>
            </div>
        </header>
    );
};

export default Header;