import React, { useContext, useEffect } from 'react';
import { getUserById } from '../../api/api';
import { CartButton } from '../Cart/CartButton/CartButton';
import './Header.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { ProductContext } from '../../contexts/CartContext/ProductContext';
import { SearchBar } from '../SearchBar/SearchBar'
import { FaRegUser } from "react-icons/fa";
import { SignUpContext } from '../../contexts/SignUpContext/SignUpContext';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { RiFileList3Line } from "react-icons/ri";


const Header = () => {
    const { isMenuVisible, setIsMenuVisible } = useContext(ProductContext);
    const { userId, logged } = useContext(SignUpContext);
    const [userName, setUserName] = React.useState('')

    const handleUser = async () => {
        const { name } = await getUserById(userId)
        console.log(userId);

        setUserName(name)
    }

    useEffect(() => {
        handleUser()
    }, [])


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
                    <FaRegUser style={{ fontSize: '26px' }} />
                    {logged ? <span>{userName}</span> : <Link className="signin-buttom-link" to='/login'>SignIn</Link>
                    }
                </div>
                {logged &&
                <Link className="user-pedidos" to={`/final/${userId}`}>
                    <RiFileList3Line  style={{ fontSize: '26px' }}/>
                    <span className="buttom-link-pedidos">
                        Meus pedidos
                    </span>
                </Link>
                }
            </div>
                <div>
                    <CartButton />
                </div>
        </header>
    );
};

export default Header;