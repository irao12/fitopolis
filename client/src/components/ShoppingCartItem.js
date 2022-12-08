import React, { useContext } from "react";
import DeleteIcon from "../icons/delete.svg";
import IconButton from "./IconButton";
import { CartContext } from "../context/CartContext";
import "./ShoppingCartItem.css";

export default function ShoppingCartItem({ cartItem }) {
	const cartContext = useContext(CartContext);

	return (
		<div className="shopping-cart-item">
			<img
				className="cart-item-image"
				src={`/listingImages/${cartItem.images[0]}`}
				alt={cartItem.title}
			></img>
			<div className="cart-listing-info">
				<h2 className="cart-item-title">{cartItem.title}</h2>
				<h3>Price: {cartItem.price}</h3>
				<p>Quantity: {cartItem.quantityDesired}</p>
			</div>
			<IconButton
				img={DeleteIcon}
				alt={"Cart"}
				role="cart"
				handleClick={() => {
					cartContext.deleteFromCart(cartItem);
				}}
			/>
		</div>
	);
}
