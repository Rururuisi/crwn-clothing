import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";
import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { AuthError, AuthErrorCodes } from "firebase/auth";

import {
    googleSignInStart,
    emailSignInStart,
} from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const SignInForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormField = () => setFormFields(defaultFormFields);

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormField();
        } catch (err) {
            switch ((err as AuthError).code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    alert("Incorrect Password for Email! ");
                    break;
                case AuthErrorCodes.USER_DELETED:
                    alert("User Not Found! ");
                    break;
                default:
                    console.log(
                        "User Sign In Encountered an Error",
                        err
                    );
            }
        }
    };

    return (
        <SignInContainer>
            <h2>Already Have an Account? </h2>
            <span>Sign In with Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    name="email"
                    required
                />
                <FormInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    name="password"
                    required
                />
                <ButtonsContainer>
                    <Button>Sign In</Button>
                    <Button
                        type="button"
                        buttonType={BUTTON_TYPE_CLASSES.google}
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignInForm;
