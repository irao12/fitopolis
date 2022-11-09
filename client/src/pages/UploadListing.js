import React, { useState } from "react";
import "./UploadListing.css";
import ListingImageUploader from "../components/ListingImageUploader";
import Error from "../components/Error";

export default function UploadListing() {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		price: 0,
		shipping: 0,
		quantity: 0,
		imageList: [],
	});

	// state to keep track of which inputs are valid
	const [isTitleValid, setIsTitleValid] = useState(true);
	const [isPriceValid, setIsPriceValid] = useState(true);
	const [isShippingValid, setIsShippingValid] = useState(true);
	const [isQuantityValid, setIsQuantityValid] = useState(true);
	const [isImageListValid, setIsImageListValid] = useState(true);

	const validateTitle = (title) => {
		// title cannot be empty
		if (title.length === 0) {
			setIsTitleValid(false);
			return false;
		} else {
			setIsTitleValid(true);
		}
	};

	const validatePrice = (price) => {
		// price must be greater than 0
		if (price <= 0) {
			setIsPriceValid(false);
			return false;
		} else {
			setIsPriceValid(true);
		}
	};

	const validateShipping = (shipping) => {
		// shipping must at least be 0
		if (shipping < 0) {
			setIsShippingValid(false);
			return false;
		} else {
			setIsShippingValid(true);
		}
	};

	const validateQuantity = (quantity) => {
		// price must be at least 0
		if (quantity < 0) {
			setIsQuantityValid(false);
			return false;
		} else {
			setIsQuantityValid(true);
		}
	};

	const validateImageList = (imageList) => {
		// must have at least one image
		if (imageList.length === 0) {
			setIsImageListValid(false);
			return false;
		} else {
			setIsImageListValid(true);
		}
	};

	const validateForm = () => {
		let isValid = true;
		if (!validateTitle(formData.title)) isValid = false;
		if (!validatePrice(formData.price)) isValid = false;
		if (!validateQuantity(formData.quantity)) isValid = false;
		if (!validateImageList(formData.imageList)) isValid = false;
		if (!validateShipping(formData.shipping)) isValid = false;
		return isValid;
	};

	const handleFormChange = (event) => {
		const input = event.target.name;
		const value = event.target.value;
		switch (input) {
			case "title":
				validateTitle(value);
				break;
			case "price":
				validatePrice(value);
				break;
			case "shipping":
				validateShipping(value);
				break;
			case "quantity":
				validateQuantity(value);
				break;
			default:
				break;
		}
		setFormData({
			...formData,
			[input]: value,
		});
	};

	const maxImageCount = 3;

	const handleImageChange = (newImageList, addUpdateIndex) => {
		validateImageList(newImageList);
		if (newImageList.length > maxImageCount) return;
		setFormData({ ...formData, imageList: newImageList });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (validateForm()) return;
		console.log("submitted");

		const imageList = formData.imageList.map((image) => {
			return image.data_url;
		});

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
						price: Math.round(formData.price * 100) / 100,
						shipping: Math.round(formData.shipping * 100) / 100,
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
					className={!isTitleValid ? "invalid" : ""}
				></input>
				{!isTitleValid && <Error message="* Title cannot be empty" />}

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
				{!isImageListValid && (
					<Error message="* Must include at least one image" />
				)}

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
					className={!isPriceValid ? "invalid" : ""}
				></input>
				{!isPriceValid && (
					<Error message="* Price must be greater than 0" />
				)}

				<label htmlFor="shipping">Shipping:</label>
				<input
					type="number"
					name="shipping"
					id="shipping"
					min="0"
					step="0.01"
					value={formData.shipping}
					onChange={handleFormChange}
					required
					className={!isShippingValid ? "invalid" : ""}
				></input>
				{!isShippingValid && (
					<Error message="* Shipping must be 0 or higher" />
				)}

				<label htmlFor="quantity">Quantity</label>
				<input
					type="number"
					name="quantity"
					id="quantity"
					min="0"
					max="100"
					value={formData.quantity}
					onChange={handleFormChange}
					required
					className={!isQuantityValid ? "invalid" : ""}
				></input>
				{!isQuantityValid && (
					<Error message="* Quantity must be greater or equal to 0" />
				)}

				<button className="create-listing-btn" type="submit">
					Create Listing
				</button>
			</form>
		</main>
	);
}
