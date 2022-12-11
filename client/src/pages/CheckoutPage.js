import React, { useContext, useState } from "react";
import "./CheckoutPage.css";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
	const cartContext = useContext(CartContext);
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
	const [addressInfo, setAddressInfo] = useState({
		name: "",
		address: "",
		city: "",
		zipcode: "",
	});
	const [isNameValid, setIsNameValid] = useState(true);
	const [isAddressValid, setIsAddressValid] = useState(true);
	const [isCityValid, setIsCityValid] = useState(true);
	const [isZipcodeValid, setIsZipcodeValid] = useState(true);

	const handleAddressChange = (event) => {
		setAddressInfo({
			...addressInfo,
			[event.target.name]: event.target.value,
		});
	};

	const isEmptyString = (input) => {
		return input !== "";
	};

	const validateName = () => {
		setIsNameValid(isEmptyString(addressInfo.name));
	};
	const validateAddress = () => {
		setIsAddressValid(isEmptyString(addressInfo.address));
	};
	const validateCity = () => {
		setIsCityValid(isEmptyString(addressInfo.city));
	};
	const validateZipcode = () => {
		if (addressInfo.zipcode.length !== 5) {
			setIsZipcodeValid(false);
			return;
		}
		setIsZipcodeValid(/^\d{5}$/.test(addressInfo.zipcode));
	};

	const completeOrder = async () => {
		if (cartContext.cart.length === 0) return;
		validateName();
		validateAddress();
		validateCity();
		validateZipcode();
		if (
			!isNameValid ||
			!isAddressValid ||
			!isCityValid ||
			!isZipcodeValid
		) {
			return;
		}

		await cartContext.getDataForListings();

		for (const sellerID of cartContext.sellers) {
			const listingsBelongingToSeller = [];
			cartContext.cartInfo.forEach((cartItem) => {
				if (cartItem.sellerID === sellerID) {
					listingsBelongingToSeller.push({
						listingID: cartItem.id,
						sellerID: cartItem.sellerID,
						title: cartItem.title,
						price: cartItem.price,
						shipping: cartItem.shipping,
						quantity: cartItem.quantityDesired,
						condition: cartItem.condition,
					});
				}
			});
			try {
				let response = await fetch("/api/order", {
					method: "POST",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						data: {
							sellerID: sellerID,
							buyerID: auth.user.id,
							orderDetails: {
								items: listingsBelongingToSeller,
							},
							address: `${addressInfo.name}\n${addressInfo.address}\n${addressInfo.city}, ${addressInfo.zipcode}`,
							tracking: "",
							completed: false,
						},
					}),
				});
			} catch (error) {
				console.error("Server error while creating a new order", error);
				return;
			}
			await cartContext.clearCart();
			navigate("/cart");
		}
	};

	return (
		<div className="checkout-page">
			<div className="checkout-cart-section">
				<h1>Checkout</h1>

				<div className="checkout-address">
					<h1>Enter an Address</h1>
					<div className="address-section">
						<label htmlFor="checkout-first-name">Name:</label>
						<input
							id="checkout-name"
							name="name"
							type="text"
							value={addressInfo.firstName}
							onChange={(e) => handleAddressChange(e)}
							className={isNameValid ? "" : "invalid"}
						></input>
					</div>
					{!isNameValid && <Error message="* Name cannot be empty" />}
					<div className="address-section">
						<label htmlFor="checkout-address-line">Address:</label>
						<input
							id="checkout-address-line"
							type="text"
							name="address"
							value={addressInfo.address}
							onChange={(e) => handleAddressChange(e)}
							className={isAddressValid ? "" : "invalid"}
						></input>
					</div>
					{!isAddressValid && (
						<Error message="* Address cannot be empty" />
					)}

					<div className="address-section">
						<label htmlFor="checkout-city">City:</label>
						<input
							id="checkout-city"
							type="text"
							name="city"
							value={addressInfo.city}
							onChange={(e) => handleAddressChange(e)}
							className={isCityValid ? "" : "invalid"}
						></input>
					</div>
					{!isCityValid && <Error message="* City cannot be empty" />}

					<div className="address-section">
						<label htmlFor="checkout-zipcode">Zipcode:</label>
						<input
							id="checkout-zipcode"
							type="text"
							name="zipcode"
							maxLength={5}
							value={addressInfo.zipcode}
							onChange={(e) => handleAddressChange(e)}
							className={isZipcodeValid ? "" : "invalid"}
						></input>
					</div>
					{!isZipcodeValid && (
						<Error message="* Zipcode must be 5 digits" />
					)}
				</div>

				<div className="checkout-cart">
					<h1>Cart</h1>
					<div className="checkout-cart-items">
						{cartContext.cartInfo.map((cartItem) => (
							<div className="checkout-item">
								<p>
									{cartItem.title} x{" "}
									{cartItem.quantityDesired}
								</p>
								<p>
									${cartItem.price * cartItem.quantityDesired}
								</p>
							</div>
						))}
					</div>
				</div>

				<div className="checkout-cart-subtotal">
					<h2>{`Subtotal: $${cartContext.subtotal}`}</h2>
				</div>
				<div className="checkout-cart-shipping">
					<h2>{`Shipping: $${cartContext.shippingTotal}`}</h2>
				</div>
				<div className="checkout-cart-total">
					<h2>{`Total: $${cartContext.total}`}</h2>
				</div>
				<Button
					className="complete-order-button"
					text="Complete Order"
					handleClick={completeOrder}
				/>
			</div>
		</div>
	);
}
