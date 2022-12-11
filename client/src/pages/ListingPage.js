import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ListingPage.css";
import ImageCarousel from "../components/ImageCarousel";
import { CartContext } from "../context/CartContext";

export default function ListingPage() {
	const [loading, setLoading] = React.useState(false);
	const [listingData, setListingData] = React.useState({});
	const [quantity, setQuantity] = React.useState(1);
	const [displayAdded, setDisplayAdded] = React.useState(false);

	const { id } = useParams();
	const cart = useContext(CartContext);

	const incrementQuantity = () => {
		if (quantity + 1 > Number.parseInt(listingData.quantity)) return;
		setQuantity(quantity + 1);
	};

	const decrementQuantity = () => {
		if (quantity - 1 < 1) {
			setQuantity(1);
		} else {
			setQuantity((oldQuantity) => oldQuantity - 1);
		}
	};

	const handleQuantityChange = (event) => {
		setQuantity(event.target.value);
	};

	const getListingData = async () => {
		setLoading(true);
		try {
			let response = await fetch(`/api/listing/${id}`);
			const listingData = await response.json();
			setListingData(listingData);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const addListingToCart = () => {
		cart.addToCart(listingData, quantity);
	};

	useEffect(() => {
		getListingData();
	}, []);

	return (
		<main className="listing-page">
			<div className="listing-page-top">
				<ImageCarousel images={listingData.images} />
				<div className="listing-page-info">
					<h1 className="listing-title">{listingData.title}</h1>
					<p className="listing-condition">{`Condition: ${listingData.condition}`}</p>
					<p className="listing-price">{`Price: $${(
						(listingData.price * 100) /
						100
					).toFixed(2)}`}</p>
					<p className="listing-shipping">{`Shipping: $${(
						(listingData.shipping * 100) /
						100
					).toFixed(2)}`}</p>
					<div className="listing-quantity-section">
						<p>Quantity: </p>
						<div className="listing-quantity-modifier">
							<button
								className="change-quantity-button"
								type="button"
								onClick={decrementQuantity}
							>
								-
							</button>
							<input
								type="number"
								value={quantity}
								onChange={handleQuantityChange}
							></input>
							<button
								className="change-quantity-button"
								type="button"
								onClick={incrementQuantity}
							>
								+
							</button>
						</div>
					</div>
					<button
						className="add-to-cart-button"
						type="button"
						onClick={() => {
							addListingToCart();
							setDisplayAdded(true);
							setTimeout(() => {
								setDisplayAdded(false);
							}, 3000);
						}}
					>
						{displayAdded ? "Added To Cart!" : "Add To Cart"}
					</button>
				</div>
			</div>
			<div className="listing-description-section">
				<h1>Item Description</h1>
				<p className="listing-description">{listingData.description}</p>
			</div>
		</main>
	);
}
