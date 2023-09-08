import {
    CheckoutItemContainer,
    ImageContainer,
    CheckoutItemInfo,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
} from "./checkout-item.styles";

import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

function CheckoutItem({ checkoutItem }) {
    const { name, imageUrl, quantity, price } = checkoutItem;

    const { addItemToCart, reduceItemFromCart, removeItemFromCart } =
        useContext(CartContext);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <CheckoutItemInfo>{name}</CheckoutItemInfo>
            <Quantity>
                <Arrow onClick={() => reduceItemFromCart(checkoutItem)}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={() => addItemToCart(checkoutItem)}>
                    &#10095;
                </Arrow>
            </Quantity>
            <CheckoutItemInfo>${price}</CheckoutItemInfo>
            <RemoveButton onClick={() => removeItemFromCart(checkoutItem)}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;
