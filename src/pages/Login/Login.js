import React from "react";
import { Link, useHistory } from "react-router-dom";

//import * as authService from "../services/authService";
import { useAuth } from "../../AuthProvider";
import Form from "./Form";
import Button from "../../components/Button";

const Login = () => {
    const history = useHistory();
    const { login } = useAuth();

    const handleSuccessfulLogin = (user) => {
        login(user);
        history.push("/");
    };

    return (
        <>
        {/* <Form onSubmit={authService.login} onSuccess={handleSuccessfulLogin} /> */}
        <p>Don't have an account yet?
        <strong>
          <Link to="/register">Create one</Link>
        </strong>
        </p>
        </>
    );
};

export default Login; 