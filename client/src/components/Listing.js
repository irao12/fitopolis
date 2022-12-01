import React from "react";
import { Link } from "react-router-dom";
import "./Listing.css";

export default function Listing({ listingData }) {
	return (
		<Link className="listing-link" to={`/catalog/${listingData.id}`}>
			<div className="listing">
				<img
					width={200}
					src={`./listingImages/${listingData.images[0]}`}
					alt="listing"
				></img>
				<div className="listing-info">
					<h1>{listingData.title}</h1>
					<p>{`$${listingData.price}`}</p>
					<p>{listingData.condition}</p>
				</div>
			</div>
		</Link>
	);
}
