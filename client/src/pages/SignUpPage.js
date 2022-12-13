import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";
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

	const [isFirstNameValid, setIsFirstNameValid] = useState(true);
	const [isLastNameValid, setIsLastNameValid] = useState(true);
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [isConfirmValid, setIsConfirmValid] = useState(true);

	const validateFirstName = (firstNameInput) => {
		if (firstNameInput.trim() === "") {
			setIsFirstNameValid(false);
			return false;
		}
		setIsFirstNameValid(true);
		return true;
	};
	const validateLastName = (lastNameInput) => {
		if (lastNameInput.trim() === "") {
			setIsLastNameValid(false);
			return false;
		}
		setIsLastNameValid(true);
		return true;
	};
	const validateEmail = (emailInput) => {
		if (emailInput.trim() === "" || email.indexOf("@") < 0) {
			setIsEmailValid(false);
			return false;
		}
		setIsEmailValid(true);
		return true;
	};
	const validatePassword = (passwordInput) => {
		if (passwordInput.trim() === "" || passwordInput.length < 7) {
			setIsPasswordValid(false);
			return false;
		}
		setIsPasswordValid(true);
		return true;
	};
	const validateConfirmation = (confirmPasswordInput) => {
		if (confirmPasswordInput !== password) {
			setIsConfirmValid(false);
			return false;
		}
		setIsConfirmValid(true);
		return true;
	};

	const handleInputChange = (event) => {
		setInputs({ ...inputs, [event.target.name]: event.target.value });
	};

	const onSubmitForm = async (event) => {
		event.preventDefault();

		const firstNameValid = validateFirstName(firstName);
		const lastNameValid = validateLastName(lastName);
		const emailValid = validateEmail(email);
		const passwordValid = validatePassword(password);
		const confirmValid = validateConfirmation(confirmPassword);

		if (
			!firstNameValid ||
			!lastNameValid ||
			!emailValid ||
			!passwordValid ||
			!confirmValid
		) {
			return;
		}

		try {
			const body = {
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
			};

			fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(body),
			}).then((response) => {
				if (response.ok) {
					alert("Account was successfully created");
					// navigate("/");
				} else {
					alert("There was an error creating the account");
				}
			});
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
						className={isFirstNameValid ? "" : "invalid"}
						onChange={(event) => {
							handleInputChange(event);
							validateFirstName(event.target.value);
						}}
					/>
					{!isFirstNameValid && (
						<Error message="* Please enter a first name" />
					)}

					<label htmlFor="lastName">Last Name</label>
					<input
						type="text"
						id="lastName"
						name="lastName"
						value={lastName}
						className={isLastNameValid ? "" : "invalid"}
						onChange={(event) => {
							handleInputChange(event);
							validateLastName(event.target.value);
						}}
					/>
					{!isLastNameValid && (
						<Error message="* Please enter a last name" />
					)}

					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						className={isEmailValid ? "" : "invalid"}
						onChange={(event) => {
							handleInputChange(event);
							validateEmail(event.target.value);
						}}
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
						onChange={(event) => {
							handleInputChange(event);
							validatePassword(event.target.value);
						}}
					/>
					{!isPasswordValid && (
						<Error message="* Please enter a password with at least 7 characters" />
					)}

					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={confirmPassword}
						className={isConfirmValid ? "" : "invalid"}
						onChange={(event) => {
							handleInputChange(event);
							validateConfirmation(event.target.value);
						}}
					/>
					{!isConfirmValid && (
						<Error message="* Password and confirmation are not the same" />
					)}

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
