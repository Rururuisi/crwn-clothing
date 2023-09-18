import { AuthenticationContainer } from "./authentication.styles";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectCurrentUser } from "../../store/user/user.selector";

import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import { useEffect } from "react";

function Authentication() {
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        if(currentUser){
            navigate("/");
        }
    }, [navigate, currentUser]);
    
    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    );
}

export default Authentication;
