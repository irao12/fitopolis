import React, { useEffect, useState } from "react";
import Button from "./Button";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function OrderPreview({ orderInfo }) {
	const navigate = useNavigate();
	const { orderID, createdAt } = orderInfo;
	const dateObject = new Date(createdAt);

	return (
		<div className="order">
			<div>Order ID: {orderID}</div>
			<div>Date purchased: {format(dateObject, "PP")} </div>
			<div>{orderInfo.completed ? "Completed" : "Not Completed"}</div>
			<Button
				text="View Details"
				handleClick={() => {
					navigate(`/orders/${orderID}`);
				}}
			/>
		</div>
	);
}
