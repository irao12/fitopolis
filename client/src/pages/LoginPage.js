import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login&SignUpPage.css";

import { AuthContext } from "../context/AuthContext";

export default function Login(props) {
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		redirectToReferrer: false,
		failed: false,
		email: "",
		password: "",
	});

	const auth = React.useContext(AuthContext);

	const { email, password } = inputs;

	const handleChange = (event) => {
		setInputs({ ...inputs, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		auth.authenticate(email, password)
			.then((user) => {
				setInputs({ ...inputs, redirectToReferrer: true });
				navigate("/");
			})
			.catch((error) => {
				setInputs({ ...inputs, failed: true });
			});
	};

	return (
		<div className="login-page">
			<div className="auth-form-container">
				<h1>Log In</h1>
				<form className="login-form" onSubmit={handleSubmit}>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => handleChange(e)}
					/>

					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => handleChange(e)}
					/>

					<button type="submit">Log In</button>
				</form>
				<Link className="signup-link" to="/signup">
					<button type="button" className="link-btn">
						Don't have an account? Sign up here
					</button>
				</Link>
			</div>
		</div>
	);
}
