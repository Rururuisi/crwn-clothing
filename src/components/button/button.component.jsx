import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
} from "./button.styles";

/* 
    default
    inverted
    google-sign-in
*/

const BUTTON_TYPE_CLASSES = {
    base: BaseButton,
    google: GoogleSignInButton,
    inverted: InvertedButton,
};

const getButton = (buttonType = "base") => BUTTON_TYPE_CLASSES[buttonType];

function Button({ children, buttonType, ...otherProps }) {
    const CustomButton = getButton(buttonType);

    return <CustomButton {...otherProps}>{children}</CustomButton>;
}

export default Button;
