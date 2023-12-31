import { CategoryItem } from "../categories/category.type";

export enum CART_ACTION_TYPE {
    TOGGLE_CART = "cart/TOGGLE_CART",
    SET_CART_ITEMS = "cart/SET_CART_ITEMS",
    SET_CART_COUNT = "cart/SET_CART_COUNT",
    SET_CART_CHECKOUT = "cart/SET_CART_CHECKOUT",
};

export type CartItem = CategoryItem & {
    quantity: number;
}

