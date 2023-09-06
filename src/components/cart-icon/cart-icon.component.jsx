import "./cart-icon.styles.scss";
import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";

function CartIcon() {
    const { isCartOpen, setIsCardOpen, cartCount } = useContext(CartContext);

    const toggleCartOpen = () => setIsCardOpen(!isCartOpen);

    return (
        <div className="cart-icon-container" onClick={toggleCartOpen}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    );
}

export default CartIcon;
