import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

import Search from "./Search";
import IconButton from "../IconButton";
import AccountIcon from "../../icons/account.svg";
import CartIcon from "../../icons/cart.svg";
import AuthButton from "./AuthButton";

export default function Navbar() {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();
	const auth = useContext(AuthContext);

	const searchCatalog = () => {
		navigate(`/catalog?search=${search}`);
	};

	const navigateToCart = () => {
		navigate("/cart");
	};

	const navigateToAccount = () => {
		navigate("/account");
	};

	return (
		<nav className="navbar">
			<Link className="logo" to="/">
				FITOPOLIS
			</Link>
			<Search
				search={search}
				setSearch={setSearch}
				searchCatalog={searchCatalog}
			></Search>
			<div className="side-buttons">
				{auth.isAuthenticated && (
					<IconButton
						img={AccountIcon}
						alt={"Account"}
						role="account"
						handleClick={navigateToAccount}
					/>
				)}
				<IconButton
					img={CartIcon}
					alt={"Cart"}
					role="cart"
					handleClick={navigateToCart}
				/>
				<AuthButton />
			</div>
		</nav>
	);
}
