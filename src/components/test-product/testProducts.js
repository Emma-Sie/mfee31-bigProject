import React, { Component } from "react";
import ShopContext from "../../context/ShopContext";
import MainNavigation from "../test-nav/MainNavigation";
import "./testProducts.css";

function ProductsPage(props) {
    return (
        <ShopContext.Consumer>
            {context => (
                <React.Fragment>
                    <MainNavigation
                        cartItemNumber={context.cart.reduce((count, curItem) => {
                            return count + curItem.quantity;
                        }, 0)}
                    />
                    <main className="products">
                        <ul>
                            {context.products.map(product => (
                                <li key={product.id}>
                                    <div>
                                        <strong>{product.title}</strong> - ${product.price}
                                    </div>
                                    <div>
                                        <button
                                            onClick={context.addProductToCart.bind(this, product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </main>
                </React.Fragment>
            )}
        </ShopContext.Consumer>
    );
}

export default ProductsPage;