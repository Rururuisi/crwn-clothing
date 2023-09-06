import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [checkout, setCheckout] = useState(0);

    useEffect(() => {
        setCartCount(
            cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        );
        setCheckout(
            cartItems.reduce(
                (total, cartItem) => total + cartItem.quantity * cartItem.price,
                0
            )
        );
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const reduceItemFromCart = (cartItemToReduce) => {
        setCartItems(reduceCartItem(cartItems, cartItemToReduce));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
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
