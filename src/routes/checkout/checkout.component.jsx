import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total,
} from "./checkout.styles";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const headers = ["Product", "Description", "Quantity", "Price", "Remove"];

function Checkout() {
    const { cartItems, checkout } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                {headers.map((header, idx) => (
                    <HeaderBlock key={idx}>
                        <span>{header}</span>
                    </HeaderBlock>
                ))}
            </CheckoutHeader>
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} checkoutItem={cartItem} />
            ))}
            <Total>Total: ${checkout}</Total>
        </CheckoutContainer>
    );
}

export default Checkout;
