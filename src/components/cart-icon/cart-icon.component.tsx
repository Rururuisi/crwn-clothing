import {
    CartIconContainer,
    ShoppingCartIcon,
    ItemCount,
} from "./cart-icon.styles";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
    selectIsCartOpen,
    selectCartCount,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";

function CartIcon() {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);

    const toggleCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleCartOpen}>
            <ShoppingCartIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;
