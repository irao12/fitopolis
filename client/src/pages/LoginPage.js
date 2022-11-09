import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login&SignUpPage.css";

export default function Login(props) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData.email);
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
					value={formData.email}
					onChange={handleChange}
				/>

				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
				/>

				<button type="submit">Log In</button>
			</form>
			<Link className="signup-link" to="/signup">
				<button type="button" className="link-btn">
					Don't have an account? Sign up here
				</button>
			</Link>
		</div>
	);
}
