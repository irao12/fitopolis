import React, { useContext, useEffect, useState } from "react";
import "./CartPage.css";
import { CartContext } from "../context/CartContext";
import ShoppingCartItem from "../components/ShoppingCartItem";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
	const cartContext = useContext(CartContext);
	const navigate = useNavigate();

	const navigateToCheckout = () => {
		navigate("/checkout");
	};

	return (
		<div className="cart-page">
			<div className="cart-section">
				<h1>Your Cart</h1>
				<div className="cart-items">
					{cartContext.cartInfo.map((cartItem) => (
						<ShoppingCartItem cartItem={cartItem} />
					))}
				</div>
				<div className="cart-subtotal">
					<h2>{`Subtotal: $${cartContext.subtotal}`}</h2>
				</div>
				<Button
					className="checkout-button"
					text="Checkout"
					handleClick={navigateToCheckout}
				/>
			</div>
		</div>
	);
}
