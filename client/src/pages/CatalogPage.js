import React, { useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Listing from "../components/Listing";
import Loading from "../components/Loading";
import "./CatalogPage.css";
import { AuthContext } from "../context/AuthContext";

export default function CatalogPage() {
	const [listings, setListings] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const auth = useContext(AuthContext);

	const [searchParams, setSearchParams] = useSearchParams();

	const searchTerm = searchParams.get("search");

	const getListings = async () => {
		setIsLoading(true);
		if (searchTerm === "") {
			try {
				let response = await fetch("/api/listing");
				let allListings = await response.json();
				setListings(allListings);
			} catch (error) {
				console.error(error);
			}
		} else {
			try {
				let response = await fetch(`/api/listing/search/${searchTerm}`);
				let allListings = await response.json();
				setListings(allListings);
			} catch (error) {
				console.error(error);
			}
		}
		setIsLoading(false);
	};

	React.useEffect(() => {
		getListings();
	}, [searchTerm]);

	return (
		<div className="catalog-page">
			{!isLoading && listings.length > 0 && (
				<div className="catalog-section">
					{listings.length > 0 && (
						<div className="listings-container">
							{listings.map((listing, index) => {
								return (
									listing.sellerID !== auth.user.id && (
										<Listing
											key={index}
											listingData={listing}
										/>
									)
								);
							})}
						</div>
					)}
				</div>
			)}
			{listings.length === 0 && !isLoading && (
				<div className="no-results-message">No Results</div>
			)}
			{isLoading && <Loading />}
		</div>
	);
}
