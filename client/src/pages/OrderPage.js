import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { format } from "date-fns";
import "./OrderPage.css";

export default function OrderPage() {
	const auth = useContext(AuthContext);
	const { id } = useParams();

	const [orderID, setOrderID] = useState("");
	const [orderDetails, setOrderDetails] = useState("");
	const [dateCreated, setDateCreated] = useState("");
	const [tracking, setTracking] = useState("");
	const [completed, setCompleted] = useState("");
	const [subtotal, setSubtotal] = useState(0);
	const [shippingTotal, setShippingTotal] = useState(0);
	const [total, setTotal] = useState(0);

	const [orderExists, setOrderExists] = useState(false);

	const dateCreatedObject = new Date(dateCreated);

	useEffect(() => {
		fetch(`/api/order/${id}`)
			.then((response) => response.json())
			.then((resp) => {
				// resp is the json the server sent back
				// then we use the useState to update the state, which is then updated in the html by react
				if (
					auth.user.id !== resp.sellerID ||
					auth.user.id !== resp.buyerID
				) {
					setOrderExists(false);
					return;
				}

				setOrderDetails(resp.orderDetails.items);
				setDateCreated(resp.createdAt);
				setTracking(resp.tracking);
				setCompleted(resp.completed);
				setOrderID(resp.orderID);
				setSubtotal(resp.orderDetails.subtotal);
				setTotal(resp.orderDetails.total);
				setShippingTotal(resp.orderDetails.shippingTotal);
				setOrderExists(true);
			})
			.catch((err) => {
				setOrderExists(false);
			});
	}, []);
	return orderExists ? (
		<div className="order-page">
			<div className="order-details">
				<h1 className="order-id">Order ID: {orderID}</h1>
				<h3 className="order-date">
					Date of Order: {format(dateCreatedObject, "PP")}
				</h3>
				<div className="order-listings">
					{orderDetails.map((item) => (
						<div className="order-item">
							<p>
								{item.title} x {item.quantity}
							</p>

							<p>${item.price}</p>
						</div>
					))}
				</div>
				<p className="order-subtotal">Subtotal: ${subtotal}</p>
				<p className="order-shipping">Shipping: ${shippingTotal}</p>
				<p className="order-total">Total: ${total}</p>
			</div>
		</div>
	) : (
		<div className="order-not-found">Order Not Found</div>
	);
}
