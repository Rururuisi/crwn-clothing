import {
    ProductCardContainer,
    Footer,
    Name,
    Price,
} from "./product-card.styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";
import { CategoryItem } from "../../store/categories/category.type";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FC } from "react";

type ProductCardProps = {
    product: CategoryItem;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, imageUrl, price } = product;

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={addProductToCart}
            >
                Add To Cart
            </Button>
        </ProductCardContainer>
    );
}

export default ProductCard;
