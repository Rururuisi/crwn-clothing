import {
    ProductCardContainer,
    Footer,
    Name,
    Price,
} from "./product-card.styles";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";

function ProductCard({ product }) {
    const { name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button buttonType="inverted" onClick={addProductToCart}>
                Add To Cart
            </Button>
        </ProductCardContainer>
    );
}

export default ProductCard;
