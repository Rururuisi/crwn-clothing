import styled from "styled-components";

export const CategoryPreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`;

export const CategoryPreviewTitle = styled.h2`
    font-size: 28px;
    margin-bottom: 25px;
    cursor: pointer;
`;

export const Preview = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 20px;
    row-gap: 50px;

    @media screen and (max-width: 800px){
        grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 600px){
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 378px){
        grid-template-columns: repeat(1, 1fr);
    }
`;
