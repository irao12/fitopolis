import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./AuthButton.css";
import { AuthContext } from "../../context/AuthContext";
const classes = "auth-btn";

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
		navigate("/");
		auth.signout();
	};

	return (
		<div className={classes}>
			<button className="log-out-button" onClick={logout}>
				Log Out
			</button>
		</div>
	);
};

export default AuthButton;
