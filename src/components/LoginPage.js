import React, { useState } from "react";
import "./Login&SignUpPage.css";

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email);
	};

	return (
		<div className="auth-form-container">
			<h1>Log In</h1>
			<form className="login-form" onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button type="submit">Log In</button>
			</form>
			<button
				className="link-btn"
				onClick={() => props.onFormSwitch("signUp")}
			>
				Don't have an account? Sign up here
			</button>
		</div>
	);
}
