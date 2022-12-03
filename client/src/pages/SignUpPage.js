import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login&SignUpPage.css";

export default function SignUp(props) {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName:"",
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
				<label htmlFor="firstName">First Name</label>
				<input
					type="firstName"
					id="firstName"
					name="firstName"
					value={formData.firstName}
					onChange={handleChange}
				/>

                <label htmlFor="lastName">Last Name</label>
				<input
					type="lastName"
					id="lastName"
					name="lastName"
					value={formData.LastName}
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

				<button type="submit">Register</button>
			</form>

			<Link className="login-link" to="/login">
				<button type="button" className="link-btn">
					Already have an account? Login here
				</button>
			</Link>
		</div>
	);
}
