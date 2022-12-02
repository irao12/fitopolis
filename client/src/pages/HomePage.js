import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import HomeBackground from "../images/homepage_background.jpg";

export default function HomePage() {
	return (
		<main
			className="home-page"
			style={{ backgroundImage: `url(${HomeBackground})` }}
		>
			<div className="homepage-section">
				<h1>ENHANCE YOUR HEALTH WITHOUT THE PREMIUM PRICE TAG</h1>
			</div>
			<Link className="catalog-link" to="/catalog?search=">
				SHOP NOW
			</Link>
		</main>
	);
}
