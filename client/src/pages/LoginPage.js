import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";
import "./Login&SignUpPage.css";

import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

export default function Login(props) {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

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

	const validateEmail = (emailInput) => {
		if (emailInput.trim() === "") {
			setIsEmailValid(false);
			return false;
		}
		setIsEmailValid(true);
		return true;
	};

	const validatePassword = (passwordInput) => {
		if (passwordInput.trim() === "") {
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

		const emailValid = validateEmail(email);
		const passwordValid = validatePassword(password);
		if (!emailValid || !passwordValid) return;

		setIsLoading(true);
		auth.authenticate(email, password)
			.then((user) => {
				setInputs({ ...inputs, redirectToReferrer: true });
				navigate("/");
			})
			.catch((error) => {
				setInputs({ ...inputs, failed: true });
				setErrorMessage(error.message);
			});
		setIsLoading(false);
	};

	return (
		<div className="login-page">
			{!isLoading && (
				<div className="auth-form-container">
					<h1>Log In</h1>
					<form className="login-form" onSubmit={handleSubmit}>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => {
								validateEmail(e.target.value);
								handleChange(e);
							}}
							className={isEmailValid ? "" : "invalid"}
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
							className={isPasswordValid ? "" : "invalid"}
							onChange={(e) => {
								validatePassword(e.target.value);

								handleChange(e);
							}}
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
			)}
			{isLoading && <Loading />}
		</div>
	);
}
