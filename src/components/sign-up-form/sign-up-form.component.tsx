import { SignUpContainer } from "./sign-up-form.styles";
import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { AuthError, AuthErrorCodes } from "firebase/auth";

import { signUpStart } from "../../store/user/user.action";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

function SignUpForm() {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormField = () => setFormFields(defaultFormFields);

    const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match! ");
            return;
        }

        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormField();
        } catch (err) {
            if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert("Cannot create user, email already in use! ");
            } else {
                console.log("User Creation Encountered an Error", err);
            }
        }
    };

    return (
        <SignUpContainer>
            <h2>Don't Have an Account? </h2>
            <span>Sign Up with Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    value={displayName}
                    onChange={handleChange}
                    name="displayName"
                    required
                />
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
                <FormInput
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleChange}
                    name="confirmPassword"
                    required
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;
