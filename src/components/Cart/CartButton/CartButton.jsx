import React from "react";
import "./CartButton.css";

import { AiOutlineShoppingCart } from "react-icons/ai";


export function CartButton() {
    return (
        <button type="button"><AiOutlineShoppingCart/></button>
    );
}