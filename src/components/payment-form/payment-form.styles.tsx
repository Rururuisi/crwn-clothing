import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const FormContainer = styled.form`
    height: 100px;
    width: 100%;
`;

export const PaymentButton = styled(Button)`
    margin-left: auto;
    margin-top: 30px;
`;
