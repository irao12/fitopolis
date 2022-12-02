import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import Search from "./Search";
import IconButton from "../IconButton";
import AccountIcon from "../../icons/account.svg";
import CartIcon from "../../icons/cart.svg";

export default function Navbar() {
	const [search, setSearch] = useState("");
	const navigate = useNavigate();

	const searchCatalog = () => {
		navigate(`/catalog?search=${search}`);
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
				<IconButton img={AccountIcon} alt={"Account"} role="account" />
				<IconButton img={CartIcon} alt={"Cart"} role="cart" />
			</div>
		</nav>
	);
}
