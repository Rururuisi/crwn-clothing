import { useState } from "react";
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

function SignUpForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormFields({ ...formFields, [name]: value });
    };

    const resetFormField = () => setFormFields(defaultFormFields);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match! ");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, { displayName });
            resetFormField();
        } catch (err) {
            if (err.code === "auth/email-already-in-use") {
                alert("Cannot create user, email already in use! ");
            } else {
                console.log("User Creation Encountered an Error", err.message);
            }
        }
    };

    return (
        <div>
            <h1>Sign Up with Email and Password</h1>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
