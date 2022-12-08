import React, { useContext, useEffect, useState } from "react";
import "./CartPage.css";
import { CartContext } from "../context/CartContext";
import ShoppingCartItem from "../components/ShoppingCartItem";

export default function CartPage() {
	const cartContext = useContext(CartContext);
	const [listings, setListings] = useState([]);
	const [subtotal, setSubtotal] = useState(0);

	const getListingData = async (id) => {
		try {
			let response = await fetch(`/api/listing/${id}`);
			const listingData = await response.json();
			return listingData;
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const getDataForListings = async () => {
			const listing_info = [];
			for (const item of cartContext.cart) {
				const listing = await getListingData(item.id);
				const cartItem = await {
					...listing,
					quantityDesired: item.quantity,
				};
				await listing_info.push(cartItem);
			}

			await console.log(listing_info);
			await setListings(listing_info);
		};
		getDataForListings();
	}, [cartContext.cart]);

	useEffect(() => {
		let new_subtotal = 0;
		listings.forEach((cartItem) => {
			console.log(cartItem);
			console.log(new_subtotal);
			new_subtotal += cartItem.price * cartItem.quantityDesired;
		});
		setSubtotal(new_subtotal);
	}, [listings]);

	return (
		<div className="cart-page">
			<div className="cart-section">
				<h1>Your Cart</h1>
				<div className="cart-items">
					{listings.map((cartItem) => (
						<ShoppingCartItem cartItem={cartItem} />
					))}
				</div>
				<div className="cart-subtotal">
					<h2>{`Subtotal: $${subtotal}`}</h2>
				</div>
				<button className="checkout-button" type="button">
					Checkout
				</button>
			</div>
		</div>
	);
}
