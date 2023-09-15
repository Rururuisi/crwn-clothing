import {
    BaseButton,
    GoogleSignInButton,
    InvertedButton,
    ButtonSpinner,
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

function Button({ children, buttonType, isLoading, ...otherProps }) {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton disabled={isLoading} {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    );
}

export default Button;
