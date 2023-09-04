import "./sign-in-form.styles.scss";
import { useState } from "react";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

function SignInForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormField = () => setFormFields(defaultFormFields);

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
            resetFormField();
        } catch (err) {
            switch (err.code) {
                case "auth/wrong-password":
                    alert("Incorrect Password for Email! ");
                    break;
                case "auth/user-not-found":
                    alert("User Not Found! ");
                    break;
                default:
                    console.log(
                        "User Sign In Encountered an Error",
                        err.message
                    );
            }
        }
    };

    return (
        <div className="sign-in-container">
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
                <div className="buttons-container">
                    <Button>Sign In</Button>
                    <Button
                        type="button"
                        buttonType="google"
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
