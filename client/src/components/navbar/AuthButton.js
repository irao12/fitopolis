import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
const classes = "btn btn-primary";

const AuthButton = () => {
	const navigate = useNavigate();

	const auth = useContext(AuthContext);
	if (!auth.isAuthenticated) {
		return (
			<Link className={classes} to="/login">
				Login
			</Link>
		);
	}

	const logout = () => {
		auth.signout().then(() => navigate("/"));
	};

	return (
		<div className="auth-text">
			Hi! {auth.user.firstName}
			<button className={classes} onClick={logout}>
				Logout
			</button>
		</div>
	);
};

export default AuthButton;
