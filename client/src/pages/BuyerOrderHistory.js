import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import OrderPreview from "../components/OrderPreview";
import "./BuyerOrderHistory.css";
import Loading from "../components/Loading";

export default function BuyerOrderHistory() {
	const auth = useContext(AuthContext);

	// const [orderID, setorderID] = useState("");
	// const [buyerID, setbuyerID] = useState("");
	// const [sellerID, setsellerID] = useState("");
	// const [orderDetails, setorderDetails] = useState("");
	// const [dateCreated, setdateCreated] = useState("");
	// const [tracking, setTracking] = useState("");
	// const [completed, setCompleted] = useState("");
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	// This runs on-mount if you pass it an empty array as second param
	useEffect(() => {
		setIsLoading(true);
		fetch(`/api/order/buyer/${auth.user.id}`)
			.then((response) => response.json())
			.then((resp) => {
				// resp is the json the server sent back
				// then we use the useState to update the state, which is then updated in the html by react
				setOrders(resp);
			})
			.catch((err) => {
				//handle error
			});
		setIsLoading(false);
	}, []);

	return (
		<main className="buyer-order-page">
			{!isLoading && (
				<div className="description">
					<div style={{ fontSize: 33, paddingBottom: "10px" }}>
						{" "}
						Your Purchase History
					</div>
					<div className="order-list">
						{orders.length > 0 ? (
							orders.map((orderInfo, index) => (
								<OrderPreview
									key={index}
									orderInfo={orderInfo}
								/>
							))
						) : (
							<p>No Orders Yet</p>
						)}
					</div>
				</div>
			)}
			{isLoading && <Loading />}
		</main>
	);
}
