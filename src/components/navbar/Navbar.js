import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import Search from "./Search";
import IconButton from "../IconButton";
import AccountIcon from "../../icons/account.svg";
import CartIcon from "../../icons/cart.svg";

export default function Navbar() {
	return (
		<nav className="navbar">
			<Link className="logo" to="/">
				FITOPOLIS
			</Link>
			<Search></Search>
			<div className="side-buttons">
				<IconButton img={AccountIcon} alt={"Account"} role="account" />
				<IconButton img={CartIcon} alt={"Cart"} role="cart" />
			</div>
		</nav>
	);
}
