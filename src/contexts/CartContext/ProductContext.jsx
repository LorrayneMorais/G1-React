import { createContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [imgUrl, setImgUrl] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const[category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [review, setReview] = useState('');
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

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
        }}>
            {children}
        </ProductContext.Provider>
    );

}

export { ProductProvider, ProductContext };