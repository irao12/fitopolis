import React from "react";
import "./Search.css";
import SearchIcon from "../../icons/magnify.svg";
import IconButton from "../IconButton";

export default function Search({ search, setSearch, searchCatalog }) {
	const handleSearchChange = (event) => {
		setSearch(event.target.value);
	};

	return (
		<div className="search">
			<input
				className="search-bar"
				type="text"
				placeholder="Search"
				value={search}
				onChange={handleSearchChange}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						searchCatalog();
					}
				}}
			></input>
			<IconButton
				img={SearchIcon}
				alt="Search"
				role="search"
				handleClick={searchCatalog}
			/>
		</div>
	);
}
