import React, { useState, useEffect, createContext } from "react";

const CartContext = createContext();
const { Provider } = CartContext;

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			setCart(JSON.parse(savedCart));
		}
	}, []);

	const updateLocalStorage = () => {
		const cartString = JSON.stringify(cart);
		localStorage.setItem("cart", cartString);
	};

	const addToCart = (listingInfo, quantityDesired) => {
		const { id, quantity: maxQuantity } = listingInfo;
		const indexOfListing = cart.findIndex((item) => item.id === id);
		if (indexOfListing < 0) {
			setCart((oldCart) => {
				const oldCartCopy = [...oldCart];
				oldCartCopy.push({
					id: id,
					quantity:
						quantityDesired > maxQuantity
							? maxQuantity
							: quantityDesired,
				});
				return oldCartCopy;
			});
		} else {
			const currentQuantity = cart[indexOfListing].quantity;
			const newQuantity =
				currentQuantity + quantityDesired >= maxQuantity
					? maxQuantity
					: currentQuantity + quantityDesired;
			setCart((oldCart) => {
				const oldCartCopy = [...oldCart];
				oldCartCopy.splice(indexOfListing, 1, {
					id: id,
					quantity: newQuantity,
				});
				return oldCartCopy;
			});
		}
		updateLocalStorage();
	};

	const deleteFromCart = (listingInfo) => {
		const { id } = listingInfo;
		const indexOfListing = cart.findIndex((item) => item.id === id);
		if (indexOfListing < 0) return;
		setCart((oldCart) => {
			const oldCartCopy = [...oldCart];
			oldCartCopy.splice(indexOfListing, 1);
			return oldCartCopy;
		});
	};
	// cart item will have listingID, quantity

	return (
		<Provider
			value={{
				cart,
				addToCart,
				deleteFromCart,
			}}
		>
			{children}
		</Provider>
	);
};

//Create our own hook for accessing the context from any functional component
function useCart() {
	return React.useContext(CartContext);
}

export { CartContext, CartProvider };
