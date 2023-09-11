import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE } from "./cart.type";

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

export const setIsCartOpen = (isOpen) => {
    return createAction(CART_ACTION_TYPE.TOGGLE_CART, isOpen);
};

const updateCartItemsReducer = (newCartItems) => {
    return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const addItemToCart = (cartItems, productToAdd) => {
    return updateCartItemsReducer(addCartItem(cartItems, productToAdd));
};

export const reduceItemFromCart = (cartItems, cartItemToReduce) => {
    return updateCartItemsReducer(reduceCartItem(cartItems, cartItemToReduce));
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    return updateCartItemsReducer(removeCartItem(cartItems, cartItemToRemove));
};
