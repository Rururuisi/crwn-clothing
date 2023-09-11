import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const existingCartItem = (cartItems, cartItem) => {
    return cartItems.find((item) => item.id === cartItem.id);
};

const addCartItem = (cartItems, productToAdd) => {
    if (existingCartItem(cartItems, productToAdd)) {
        return cartItems.map((item) =>
            item.id === productToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const reduceCartItem = (cartItems, cartItemToReduce) => {
    if (existingCartItem(cartItems, cartItemToReduce).quantity <= 1) {
        return removeCartItem(cartItems, cartItemToReduce);
    }
    return cartItems.map((item) =>
        item.id === cartItemToReduce.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
    );
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCardOpen: () => {},
    cartItems: [],
    cartCount: 0,
    addItemToCart: () => {},
    reduceItemFromCart: () => {},
    removeItemFromCart: () => {},
    checkout: 0,
});

const CART_ACTION_TYPE = {
    TOGGLE_CART: "TOGGLE_CART",
    SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPE.TOGGLE_CART:
            return { ...state, isCartOpen: payload };
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    checkout: 0,
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { isCartOpen, cartItems, cartCount, checkout } = state;

    const setIsCartOpen = (isOpen) => {
        dispatch(createAction(CART_ACTION_TYPE.TOGGLE_CART, isOpen));
    };

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        const newCheckout = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );
        const payload = {
            cartItems: newCartItems,
            cartCount: newCartCount,
            checkout: newCheckout,
        };
        dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS, payload));
    };

    const addItemToCart = (productToAdd) => {
        updateCartItemsReducer(addCartItem(cartItems, productToAdd));
    };

    const reduceItemFromCart = (cartItemToReduce) => {
        updateCartItemsReducer(reduceCartItem(cartItems, cartItemToReduce));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        updateCartItemsReducer(removeCartItem(cartItems, cartItemToRemove));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        cartCount,
        reduceItemFromCart,
        removeItemFromCart,
        checkout,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
