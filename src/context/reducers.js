export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const TOTAL_PRICE = "TOTAL_PRICE";

const addProductToCart = (product, state) => {
    console.log("adding product", product);
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(
        item => item.id === product.id
    );

    if (updatedItemIndex < 0) {
        updatedCart.push({ ...product, quantity: 1 });
    } else {
        const updatedItem = {
            ...updatedCart[updatedItemIndex]
        };
        updatedItem.quantity++;
        updatedCart[updatedItemIndex] = updatedItem;
    }

    return { ...state, cart: updatedCart };
};

const removeProductFromCart = (productId, state) => {
    console.log("remove product: " + productId);
    const updatedCart = [...state.cart];
    const updatedItemIndex = updatedCart.findIndex(item => item.id === productId);

    const updatedItem = {
        ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
        updatedCart.splice(updatedItemIndex, 1);
    } else {
        updatedCart[updatedItemIndex] = updatedItem;
    }

    return { ...state, cart: updatedCart };
};


const totalPrice = (totalPrice, state) => {
    console.log("totalPrice: " + totalPrice);
    const updatedPrice = [...state.totalPrice];


    return { ...state, totalPrice: updatedPrice };
}

// const calculateItemTotals = (Items) =>
//     items.map((item) => ({
//         ...item,
//         itemTotal: item.price * item.quantity,
//     }))

// const calculateTotal = (items) =>
//     items.reduce((total, item) => total + item.quantity * item.price, 0)

// const calculateTotalItems = (items) =>
//     items.reduce((sum, item) => sum + item.quantity, 0)

// const generateCartState = (state, items) => {
//     const isEmpty = items.length === 0

//     return {
//         ...initialState,
//         ...state,
//         items: calculateItemTotals(items),
//         totalItems: calculateTotalItems(items),
//         cartTotal: calculateTotal(items),
//         isEmpty,
//     }
// }

export const shopReducer = (state, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return addProductToCart(action.product, state);

        case REMOVE_PRODUCT:
            return removeProductFromCart(action.productId, state);

        case TOTAL_PRICE:
            return totalPrice(action.totalPrice, state);

        default:
            return state;
    }
};