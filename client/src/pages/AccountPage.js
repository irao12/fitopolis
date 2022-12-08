import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./AccountPage.css";

export default function AccountPage() {
	const auth = useContext(AuthContext);
	const navigate = useNavigate();

	const navigateToOrders = () => {
		navigate("/orders");
	};

	const navigateToCreateListing = () => {
		navigate("/create-listing");
	};

	return (
		<div className="account-page">
			<div className="account-section">
				<h1 className="welcome-message">
					Hello! {auth.user.firstName}
				</h1>
				<div className="account-actions">
					<Button text="View Orders" handleClick={navigateToOrders} />
					<Button
						text="Create a Listing"
						handleClick={navigateToCreateListing}
					/>
				</div>
			</div>
		</div>
	);
}
