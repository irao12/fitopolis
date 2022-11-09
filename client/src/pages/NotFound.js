import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
	return (
		<main className="not-found-page">
			<h1>Page Not Found</h1>
			<h2>The current page does not exist</h2>
			<Link to="/">Click here to go back to the home page</Link>
		</main>
	);
}
