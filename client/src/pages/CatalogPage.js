import React from "react";
import Listing from "../components/Listing";
import "./CatalogPage.css";

export default function CatalogPage() {
	const [listings, setListings] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [page, setPage] = React.useState(1);

	const getListings = async () => {
		setLoading(true);
		try {
			let response = await fetch("/api/listing");
			let allListings = await response.json();
			setListings(allListings);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	React.useEffect(() => {
		getListings();
	}, []);

	return (
		<div className="catalog-page">
			<div className="listings-container">
				{listings.map((listing, index) => {
					return <Listing key={index} listingData={listing} />;
				})}
			</div>
		</div>
	);
}
