import React, { useContext, useEffect } from "react";
import ShopContext from "../../context/ShopContext";

import MainNavigation from "../test-nav/MainNavigation";
import "./testCart.css";

function CartPage(props) {
    const context = useContext(ShopContext);

    useEffect(() => {
        console.log(context);
    }, []);

    return (
        <React.Fragment>
            <MainNavigation
                cartItemNumber={context.cart.reduce((count, curItem) => {
                    return count + curItem.quantity;
                }, 0)}
            />
            <main className="test-cart">
                {context.cart.length <= 0 && <p>No Item in the Cart!</p>}
                <ul>
                    {context.cart.map(cartItem => (
                        <li key={cartItem.id}>
                            <div>
                                <strong>{cartItem.title}</strong> - ${cartItem.price} (
                                {cartItem.quantity})
                            </div>
                            <div>
                                <button
                                    onClick={context.removeProductFromCart.bind(
                                        this,
                                        cartItem.id
                                    )}
                                >
                                    Remove from Cart
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </React.Fragment>
    );
}

export default CartPage;