import { CategoryItem } from "../categories/category.type";
import {
    createAction,
    withMatcher,
    ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE, CartItem } from "./cart.type";

const addCartItem = (
    cartItems: CartItem[],
    productToAdd: CategoryItem
): CartItem[] => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToAdd.id
    );
    if (existingCartItem) {
        return cartItems.map((item) =>
            item.id === productToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const reduceCartItem = (
    cartItems: CartItem[],
    cartItemToReduce: CartItem
): CartItem[] => {
    const existingCartItem = cartItems.find(
        (item) => item.id === cartItemToReduce.id
    );
    if (existingCartItem && existingCartItem.quantity <= 1) {
        return removeCartItem(cartItems, cartItemToReduce);
    }
    return cartItems.map((item) =>
        item.id === cartItemToReduce.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
    );
};

const removeCartItem = (
    cartItems: CartItem[],
    cartItemToRemove: CartItem
): CartItem[] => {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
};

export type SetIsCartOpen = ActionWithPayload<
    CART_ACTION_TYPE.TOGGLE_CART,
    boolean
>;
export type SetCartItems = ActionWithPayload<
    CART_ACTION_TYPE.SET_CART_ITEMS,
    CartItem[]
>;

export const setIsCartOpen = withMatcher(
    (isOpen: boolean): SetIsCartOpen =>
        createAction(CART_ACTION_TYPE.TOGGLE_CART, isOpen)
);

export const setCartItems = withMatcher(
    (newCartItems: CartItem[]): SetCartItems =>
        createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems)
);

export const addItemToCart = (
    cartItems: CartItem[],
    productToAdd: CategoryItem
) => {
    return setCartItems(addCartItem(cartItems, productToAdd));
};

export const reduceItemFromCart = (
    cartItems: CartItem[],
    cartItemToReduce: CartItem
) => {
    return setCartItems(reduceCartItem(cartItems, cartItemToReduce));
};

export const removeItemFromCart = (
    cartItems: CartItem[],
    cartItemToRemove: CartItem
) => {
    return setCartItems(removeCartItem(cartItems, cartItemToRemove));
};

export const emptyCart = () => setCartItems([]);
