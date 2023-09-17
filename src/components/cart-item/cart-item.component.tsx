import { CartItemContainer, ItemDetails, ItemName } from "./cart-item.styles";
import { CartItem as CartItemType } from "../../store/cart/cart.type";
import { FC } from "react";

type CartItemProps = {
    cartItem: CartItemType;
}

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
    const { name, price, quantity, imageUrl } = cartItem;

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>
                <ItemName className="name">{name}</ItemName>
                <span className="price">
                    {quantity} x ${price}
                </span>
            </ItemDetails>
        </CartItemContainer>
    );
}

export default CartItem;
