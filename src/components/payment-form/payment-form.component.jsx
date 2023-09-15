import { useState } from "react";
import { useSelector } from "react-redux";

import {
    PaymentFormContainer,
    FormContainer,
    PaymentButton,
} from "./payment-form.styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartCheckout } from "../../store/cart/cart.selector";

import Button from "../button/button.component";

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const currentUser = useSelector(selectCurrentUser);
    const cartCheckout = useSelector(selectCartCheckout);

    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    const paymentHandler = async (evt) => {
        evt.preventDefault();

        if (!stripe || !elements) return;

        setIsPaymentProcessing(true);

        const response = await fetch(
            "/.netlify/functions/create-payment-intent",
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: cartCheckout * 100 }),
            }
        ).then((res) => res.json());

        const {
            paymentIntent: { client_secret },
        } = response;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest",
                },
            },
        });

        setIsPaymentProcessing(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === "succeeded") {
                alert("Payment Successful!");
            }
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <PaymentButton
                    type="submit"
                    buttonType="inverted"
                    isLoading={isPaymentProcessing}
                >
                    Pay Now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
}

export default PaymentForm;
