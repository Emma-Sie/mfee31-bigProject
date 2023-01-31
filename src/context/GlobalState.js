import React, { useState, useReducer } from "react";
import ShopContext from "./ShopContext";
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT,TOTAL_PRICE } from "./reducers";

function GlobalState(props) {
    const products = [
        { id: "p1", title: "NuPhy Halo65 Wireless Mechanical Keyboard黑Black", price: 1580 },
        { id: "p2", title: "ASUS-ROG-Strix-Scope-19 白White", price: 15800 },
        { id: "p3", title: "ASUS-ROG-Strix-Scope-19 黑Black", price: 15800 },
        { id: "p4", title: "NuPhy Halo65 Wireless Mechanical Keyboard 白White", price: 1580 }
    ];

    // const [cart, setCart] = useState([]);

    const [cartState, dispatch] = useReducer(shopReducer, { cart: [] });

    const addProductToCart = product => {
        dispatch({ type: ADD_PRODUCT, product: product });
    };

    const removeProductFromCart = productId => {
        dispatch({ type: REMOVE_PRODUCT, productId: productId });
    };

    const totalPrice = totalPrice => {
        dispatch({ type: TOTAL_PRICE, totalPrice: totalPrice });
    };

    return (
        <ShopContext.Provider
            value={{
                products: products,
                cart: cartState.cart,
                addProductToCart: addProductToCart,
                removeProductFromCart: removeProductFromCart,
                totalPrice: totalPrice
            }}
        >
            {props.children}
        </ShopContext.Provider>
    );
}

export default GlobalState;