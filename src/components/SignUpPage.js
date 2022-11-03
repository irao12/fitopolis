import React, { useState } from "react";
import "./Login&SignUpPage.css";

export default function SignUp(props) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		conPassword: "",
	});

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData.email);
	};

	return (
		<div className="auth-form-container">
			<h1>Sign Up</h1>
			<form className="signUp-form" onSubmit={handleSubmit}>
				<label htmlFor="name">Full Name</label>
				<input
					type="name"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
				/>

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

				<label htmlFor="conPass">Confirm Password</label>
				<input
					type="password"
					id="password"
					name="conPassword"
					value={formData.conPassword}
					onChange={handleChange}
				/>

				<button type="submit">Log In</button>
			</form>
			<button
				className="link-btn"
				onClick={() => props.onFormSwitch("login")}
			>
				Already have an account? Sign in here
			</button>
		</div>
	);
}
