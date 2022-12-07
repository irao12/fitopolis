import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login&SignUpPage.css";

export default function SignUp() {
	const navigate = useNavigate();

	const [inputs, setInputs] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { firstName, lastName, email, password, confirmPassword } = inputs;

	const handleInputChange = (event) => {
		setInputs({ ...inputs, [event.target.name]: event.target.value });
	};

	const onSubmitForm = async (event) => {
		event.preventDefault();

		try {
			const body = {
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
			};

			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			});

			const parseResponse = await response.json();
			alert(`${parseResponse.email}, your account created successfully!`);
			navigate("/");
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<div className="sign-up-page">
			<div className="auth-form-container">
				<h1>Sign Up</h1>
				<form className="signUp-form" onSubmit={onSubmitForm}>
					<label htmlFor="firstName">First Name</label>
					<input
						type="text"
						id="firstName"
						name="firstName"
						value={firstName}
						onChange={(event) => handleInputChange(event)}
					/>

					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={lastName}
						onChange={(event) => handleInputChange(event)}
					/>

					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(event) => handleInputChange(event)}
					/>

					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(event) => handleInputChange(event)}
					/>

					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={confirmPassword}
						onChange={(event) => handleInputChange(event)}
					/>

					<button type="submit">Submit</button>
				</form>

				<Link className="login-link" to="/login">
					<button type="button" className="link-btn">
						Already have an account? Login here
					</button>
				</Link>
			</div>
		</div>
	);
}
