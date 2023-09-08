import { CartItemContainer, ItemDetails, ItemName } from "./cart-item.styles";

function CartItem({ cartItem }) {
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
