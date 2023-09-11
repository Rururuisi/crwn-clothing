import { CART_ACTION_TYPE } from "./cart.type";

const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPE.TOGGLE_CART:
            return { ...state, isCartOpen: payload };
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,
            };
        default:
            return state;
    }
};
