import React from "react";
import "./UploadListing.css";

export default function UploadListing() {
	return (
		<main className="upload-page">
			<form className="upload-form">
				<label htmlFor="title">Title:</label>
				<input type="text" name="title" id="title"></input>

				<label htmlFor="description">Description: </label>
				<textarea
					name="description"
					id="description"
					maxLength={400}
				></textarea>

				<label htmlFor="price">Price:</label>
				<input type="number" name="price" id="price"></input>

				<label htmlFor="quantity">Quantity</label>
				<input type="number" name="quantity" id="quantity"></input>

				<button type="submit">Create Listing</button>
			</form>
		</main>
	);
}
