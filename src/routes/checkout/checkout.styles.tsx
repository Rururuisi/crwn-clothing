import styled from "styled-components";

export const CheckoutContainer = styled.div`
    width: 60%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px auto 0;

    @media screen and (max-width: 800px){
        width: 70%;
    }
    @media screen and (max-width: 600px){
        width: 85%;
    }
`;

export const CheckoutHeader = styled.div`
    width: 100%;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;
`;

export const HeaderBlock = styled.div`
    text-transform: capitalize;
    width: 23%;

    &:last-child {
        width: 12%;
    }

    @media screen and (max-width: 450px){
        span {
            font-size: 14px;
        }
    }
`;

export const Total = styled.span`
    margin-top: 30px;
    margin-left: auto;
    font-size: 36px;
`;
