import {
    CheckoutItemContainer,
    ImageContainer,
    CheckoutItemInfo,
    Quantity,
    Arrow,
    Value,
    RemoveButton,
} from "./checkout-item.styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
    addItemToCart,
    reduceItemFromCart,
    removeItemFromCart,
} from "../../store/cart/cart.action";

function CheckoutItem({ checkoutItem }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, imageUrl, quantity, price } = checkoutItem;

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <CheckoutItemInfo>{name}</CheckoutItemInfo>
            <Quantity>
                <Arrow
                    onClick={() =>
                        dispatch(reduceItemFromCart(cartItems, checkoutItem))
                    }
                >
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow
                    onClick={() =>
                        dispatch(addItemToCart(cartItems, checkoutItem))
                    }
                >
                    &#10095;
                </Arrow>
            </Quantity>
            <CheckoutItemInfo>${price}</CheckoutItemInfo>
            <RemoveButton
                onClick={() =>
                    dispatch(removeItemFromCart(cartItems, checkoutItem))
                }
            >
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    );
}

export default CheckoutItem;
