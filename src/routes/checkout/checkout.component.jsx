import "./checkout.styles.scss";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const headers = ["Product", "Description", "Quantity", "Price", "Remove"];

function Checkout() {
    const { cartItems, checkout } = useContext(CartContext);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                {headers.map((header, idx) => (
                    <div key={idx} className="header-block">
                        <span>{header}</span>
                    </div>
                ))}
            </div>
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} checkoutItem={cartItem} />
            ))}
            <span className="total">Total: ${checkout}</span>
        </div>
    );
}

export default Checkout;
