import {
    CheckoutContainer,
    CheckoutHeader,
    HeaderBlock,
    Total,
} from "./checkout.styles";
import { useSelector } from "react-redux";
import {
    selectCartItems,
    selectCartCheckout,
} from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import PaymentForm from "../../components/payment-form/payment-form.component";

const headers = ["Product", "Description", "Quantity", "Price", "Remove"];

function Checkout() {
    const cartItems = useSelector(selectCartItems);
    const checkout = useSelector(selectCartCheckout);

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
            <PaymentForm />
        </CheckoutContainer>
    );
}

export default Checkout;
