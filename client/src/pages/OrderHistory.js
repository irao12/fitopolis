import React, { useEffect, useState } from "react";
import "./OrderHistory.css";	
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function GetOrderHistory() {
    const [orderID, setorderID] = useState("");
    const [buyerID, setbuyerID] = useState("");
    const [sellerID, setsellerID] = useState("");
    const [orderDetails, setorderDetails] = useState("");
    const [dateCreated, setdateCreated] = useState("");

    // This runs on-mount if you pass it an empty array as second param
     useEffect(() => {
        fetch(`/api/order/${orderID}`)
            .then(response => response.json())
            .then(resp => {
                // resp is the json the server sent back
                // then we use the useState to update the state, which is then updated in the html by react
                setorderID(resp.orderID)
                setbuyerID(resp.buyerID)
                setsellerID(resp.sellerID)
                setorderDetails(resp.orderDetails)
                setdateCreated(resp.dateCreated)
            })
            .catch(err => {
            //handle error
            })
     }, [])


	return (
		<main className="orderPage" >

			<div className="description"> 
			<div style={{ fontSize:33,paddingBottom: "10px"}}> Order History</div>
			<div style={{paddingBottom: "20px"}}> Review your order history here.</div>
			
			<input type="text" placeholder="Search all orders"></input>
			</div>
			
			
			<div className="order"> 
			<div className="orderDetails"> 

			<div>Order ID: {orderID}</div>
            <div>Buyer ID: {buyerID}</div>
            <div>Seller ID: {sellerID}</div>
            <div>Order Details: {orderDetails}</div>
            <div>Date purchased: {dateCreated}</div>
			</div>
	
			<button type="button">Contact Support</button>
			<button type="button" >Track Package</button>
			<button type="button" >Leave the seller feedback</button>
			<button type="button" >Send a message to the seller</button>
			</div>


		</main>
		
	);
}