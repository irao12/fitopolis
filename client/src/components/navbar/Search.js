import React from "react";
import "./Search.css";
import SearchIcon from "../../icons/magnify.svg";
import IconButton from "../IconButton";

export default function Search() {
	return (
		<div className="search">
			<input
				className="search-bar"
				type="text"
				placeholder="Search"
			></input>
			<IconButton img={SearchIcon} alt="Search" role="search" />
		</div>
	);
}
