import React, { useState } from "react";
import "./UploadListing.css";
import ListingImageUploader from "../components/ListingImageUploader";

export default function UploadListing() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: 0,
		quantity: 0,
		imageList: [],
	});

	const handleFormChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const maxImageCount = 3;

	const handleImageChange = (newImageList, addUpdateIndex) => {
		// data for submit
		if (newImageList.length > maxImageCount) return;
		console.log(newImageList, addUpdateIndex);
		setFormData({ ...formData, imageList: newImageList });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("submitted");
		const imageList = formData.imageList.map((image) => {
			return image.data_url;
		});
		console.log(imageList);

		try {
			let response = await fetch("/api/listing", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: {
						sellerID: 1,
						...formData,
						images: imageList,
						isActive: true,
					},
				}),
			});
		} catch (error) {
			console.error("Server error while creating a new listing", error);
		}
	};

	return (
		<main className="upload-page">
			<h1>Create a Listing</h1>
			<form className="upload-form" onSubmit={handleSubmit}>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					name="title"
					id="title"
					value={formData.title}
					onChange={handleFormChange}
					required
				></input>

				<label htmlFor="description">Description: </label>
				<textarea
					name="description"
					id="description"
					maxLength={400}
					value={formData.description}
					onChange={handleFormChange}
				></textarea>

				<label>Images</label>
				<ListingImageUploader
					value={formData.imageList}
					onChange={handleImageChange}
					maxNumber={maxImageCount}
				></ListingImageUploader>

				<label htmlFor="price">Price:</label>
				<input
					type="number"
					name="price"
					id="price"
					min="0"
					step="0.01"
					value={formData.price}
					onChange={handleFormChange}
					required
				></input>

				<label htmlFor="quantity">Quantity</label>
				<input
					type="number"
					name="quantity"
					id="quantity"
					max="100"
					value={formData.quantity}
					onChange={handleFormChange}
					required
				></input>

				<button className="create-listing-btn" type="submit">
					Create Listing
				</button>
			</form>
		</main>
	);
}
