import { useState, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { StripeCardElement } from "@stripe/stripe-js";

import {
    PaymentFormContainer,
    FormContainer,
    PaymentButton,
} from "./payment-form.styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartCheckout } from "../../store/cart/cart.selector";
import { emptyCart } from "../../store/cart/cart.action";

import { BUTTON_TYPE_CLASSES } from "../button/button.component";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;


function PaymentForm() {
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    
    const currentUser = useSelector(selectCurrentUser);
    const cartCheckout = useSelector(selectCartCheckout);

    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    const paymentHandler = async (evt: FormEvent<HTMLFormElement>) => {
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

        const cardDetails = elements.getElement(CardElement);

        if(!ifValidCardElement(cardDetails)) return;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails,
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
                dispatch(emptyCart());
                elements?.getElement('card')?.clear();
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
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                    isLoading={isPaymentProcessing}
                >
                    Pay Now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
}

export default PaymentForm;
