import React from "react";
import { Link } from "react-router-dom";
import "./NoAuthenticationPage.css";

export default function NoAuthenticationPage() {
	return (
		<div class="no-authentication-page">
			<div class="no-authentication-message">
				<h1> You will need to log in in order to access this page</h1>
				<Link to="/login">LOG IN</Link>
			</div>
		</div>
	);
}
