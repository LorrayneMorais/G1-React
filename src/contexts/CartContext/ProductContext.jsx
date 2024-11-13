import { createContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [imgUrl, setImgUrl] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [review, setReview] = useState('');
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [maxQtd, setMaxQtd] = useState(0);



    return (
        <ProductContext.Provider value={{
            imgUrl,
            setImgUrl,
            name,
            setName,
            description,
            setDescription,
            price,
            setPrice,
            category,
            setCategory,
            quantity,
            setQuantity,
            review,
            setReview,
            products,
            setProducts,
            cart,
            setCart,
            isCartVisible,
            setIsCartVisible,
            loading,
            setLoading,
            isMenuVisible,
            setIsMenuVisible,
            filteredProducts,
            setFilteredProducts,
            maxQtd,
            setMaxQtd
        }}>
            {children}
        </ProductContext.Provider>
    );

}

export { ProductProvider, ProductContext };