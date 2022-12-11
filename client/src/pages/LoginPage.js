import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";
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
	const [errorMessage, setErrorMessage] = useState("");
	const auth = React.useContext(AuthContext);

	const { email, password } = inputs;
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);

	const validateEmail = () => {
		if (email === "") {
			setIsEmailValid(false);
			return false;
		}
		setIsEmailValid(true);
		return true;
	};

	const validatePassword = () => {
		if (password === "") {
			setIsPasswordValid(false);
			return false;
		}
		setIsPasswordValid(true);
		return true;
	};

	const handleChange = (event) => {
		setInputs({ ...inputs, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const emailValid = validateEmail();
		const passwordValid = validatePassword();
		if (!emailValid || !passwordValid) return;

		auth.authenticate(email, password)
			.then((user) => {
				setInputs({ ...inputs, redirectToReferrer: true });
				navigate("/");
			})
			.catch((error) => {
				setInputs({ ...inputs, failed: true });
				setErrorMessage(error.message);
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
					{!isEmailValid && (
						<Error message="* Please enter an email" />
					)}

					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => handleChange(e)}
					/>

					{!isPasswordValid && (
						<Error message="* Please enter a password" />
					)}

					<button type="submit">Log In</button>
				</form>
				<Link className="signup-link" to="/signup">
					<button type="button" className="link-btn">
						Don't have an account? Sign up here
					</button>
				</Link>
				{errorMessage !== "" && <Error message={errorMessage} />}
			</div>
		</div>
	);
}
