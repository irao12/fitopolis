import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Listing from "../components/Listing";
import "./CatalogPage.css";

export default function CatalogPage() {
	const [listings, setListings] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [page, setPage] = React.useState(1);

	const [searchParams, setSearchParams] = useSearchParams();

	const searchTerm = searchParams.get("search");

	const getListings = async () => {
		setLoading(true);
		if (searchTerm === "") {
			try {
				let response = await fetch("/api/listing");
				let allListings = await response.json();
				setListings(allListings);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				let response = await fetch(`/api/listing/search/${searchTerm}`);
				let allListings = await response.json();
				setListings(allListings);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		}
	};

	React.useEffect(() => {
		getListings();
	}, [searchTerm]);

	return (
		<div className="catalog-page">
			{listings.length === 0 && (
				<div className="no-results-message">No Results</div>
			)}
			{listings.length > 0 && (
				<div className="listings-container">
					{listings.map((listing, index) => {
						return <Listing key={index} listingData={listing} />;
					})}
				</div>
			)}
		</div>
	);
}
