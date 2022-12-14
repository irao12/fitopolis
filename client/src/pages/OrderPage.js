import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { format } from "date-fns";
import "./OrderPage.css";
import Loading from "../components/Loading";

export default function OrderPage() {
	const auth = useContext(AuthContext);
	const { id } = useParams();

	const [orderID, setOrderID] = useState("");
	const [orderDetails, setOrderDetails] = useState("");
	const [dateCreated, setDateCreated] = useState("");
	const [address, setAddress] = useState("");
	const [tracking, setTracking] = useState("");
	const [completed, setCompleted] = useState("");
	const [subtotal, setSubtotal] = useState(0);
	const [shippingTotal, setShippingTotal] = useState(0);
	const [total, setTotal] = useState(0);

	const [isLoading, setIsLoading] = useState(false);

	const [orderExists, setOrderExists] = useState(false);

	const dateCreatedObject = new Date(dateCreated);

	useEffect(() => {
		setIsLoading(true);
		fetch(`/api/order/${id}`)
			.then((response) => response.json())
			.then((resp) => {
				// resp is the json the server sent back
				// then we use the useState to update the state, which is then updated in the html by react
				if (
					auth.user.id !== resp.sellerID &&
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
				setAddress(resp.address);
				setOrderExists(true);
			})
			.catch((err) => {
				setOrderExists(false);
			});
		setIsLoading(false);
	}, []);
	return orderExists ? (
		<div className="order-page">
			{!isLoading && (
				<div className="order-details">
					<h1 className="order-id">Order ID: {orderID}</h1>

					<h3 className="order-date">
						Order date: {format(dateCreatedObject, "PP")}
					</h3>

					<div className="order-address">
						<h2 className="order-address-heading">Address: </h2>
						{address.split("\n").map((section, index) => (
							<p key={index} className="order-address-section">
								{section}
							</p>
						))}
					</div>

					<div className="order-listings">
						{orderDetails.map((item, index) => (
							<div key={index} className="order-item">
								<p>
									<strong> {item.title}</strong>, ${item.price} each
								</p>
								<p>
								Qty: {item.quantity}
								</p>
							</div>
						))}
					</div>
					<p className="order-subtotal">Subtotal: ${subtotal}</p>
					<p className="order-shipping">Shipping: ${shippingTotal}</p>
					<p className="order-total">Total: ${total}</p>
				</div>
			)}
			{isLoading && <Loading />}
		</div>
	) : (
		<div className="order-not-found">Order Not Found</div>
	);
}
