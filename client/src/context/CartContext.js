import React, { useState, useEffect, createContext } from "react";

const CartContext = createContext();
const { Provider } = CartContext;

const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [subtotal, setSubtotal] = useState(0);
	const [shippingTotal, setShippingTotal] = useState(0);
	const [total, setTotal] = useState(0);
	const [cartInfo, setCartInfo] = useState([]);
	const [sellers, setSellers] = useState([]);

	const getDataForListings = async () => {
		let newSubtotal = 0;
		let newShippingTotal = 0;
		const listing_info = [];
		const newSellers = [];
		for (const item of cart) {
			const listing = await getListingData(item.id);
			const cartItem = await {
				...listing,
				quantityDesired: item.quantity,
			};
			await listing_info.push(cartItem);
			newSubtotal += cartItem.price * cartItem.quantityDesired;
			newShippingTotal += cartItem.shipping * cartItem.quantityDesired;
			if (newSellers.indexOf(listing.sellerID) < 0) {
				newSellers.push(listing.sellerID);
			}
		}

		console.log(newSellers);
		await setCartInfo(listing_info);
		await setSubtotal(newSubtotal);
		await setShippingTotal(newShippingTotal);
		await setSellers(newSellers);
	};

	const updateLocalStorage = () => {
		const cartString = JSON.stringify(cart);
		localStorage.setItem("cart", cartString);
	};

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
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			setCart(JSON.parse(savedCart));
			getDataForListings();
		}
	}, []);

	useEffect(() => {
		getDataForListings();
	}, [cart]);

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
		updateLocalStorage();
	};

	const clearCart = () => {
		setCart([]);
	};
	// cart item will have listingID, quantity

	return (
		<Provider
			value={{
				cart,
				addToCart,
				deleteFromCart,
				clearCart,
				getDataForListings,
				subtotal,
				shippingTotal,
				total: Math.round(100 * (subtotal + shippingTotal)) / 100,
				sellers,
				cartInfo,
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
