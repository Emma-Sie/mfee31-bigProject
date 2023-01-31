import React from "react";

export default React.createContext({
    products: [
        { id: "p1", title: "NuPhy Halo65 Wireless Mechanical Keyboard黑Black", price: 1580 },
        { id: "p2", title: "ASUS-ROG-Strix-Scope-19 白White", price: 15800 },
        { id: "p3", title: "ASUS-ROG-Strix-Scope-19 黑Black", price: 15800 },
        { id: "p4", title: "NuPhy Halo65 Wireless Mechanical Keyboard 白White", price: 1580 }
    ],
    cart: [],
    addProductToCart: product => { },
    removeProductFromCart: productId => { },
    totalPrice: totalPrice=>{}
});
