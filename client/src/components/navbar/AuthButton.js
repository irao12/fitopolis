import React, { useContext } from "react";
import { withRouter, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
const classes = "btn btn-primary";

const AuthButton = withRouter(({ history }) => {
    const auth = useContext(AuthContext);
    if(!auth.isAuthenticated){
        return <Link className={classes} to="/login">Login</Link>;
    }

    const logout = () => {
        auth.signout().then(() => history.push("/"));
    }

    return (
        <div className="auth-text">
            Hi! {auth.user.firstName}
            <button className={classes} onClick={logout}>Logout</button>
        </div>
    );
});

export default AuthButton;