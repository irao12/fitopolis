import React from "react";
import "./OrderHistory.css";	
import shoe from "../images/shoe.png";

export default function orders() {
	const styleObj = {
		fontSize: 33,
		color: "navy",
		textAlign: "center",
		paddingTop: "30px",
	}

	return (
		<main className="orderPage" >

			<div className="description"> 
			<div style={{ fontSize:33,paddingBottom: "10px"}}> Order History</div>
			<div style={{paddingBottom: "20px"}}> Review your order history here.</div>
			<input type="text" placeholder="Search all orders"></input>
			</div>
			
			
			<div className="order"> 
			<div className="orderDetails"> 
			<strong>Item:</strong> Blue White shoes<br />
			<strong>Order ID:</strong> 123-456-7890<br />
			<strong>Total:</strong> $123.45 <br />
			<strong>Purchase Date:</strong> 12-31-2022 <br /><br />
			<strong>Seller:</strong> bob
			</div>
			<img src={shoe} alt="shoe" width="224px"/>
			<button type="button">Contact Support</button>
			<button type="button" >Track Package</button>
			<button type="button" >Leave the seller feedback</button>
			<button type="button" >Send a message to the seller</button>
			</div>

			<div className="order"> 
			<div className="orderDetails"> 
			<strong>Item:</strong> Blue White shoes<br />
			<strong>Order ID:</strong> 123-456-7890<br />
			<strong>Total:</strong> $123.45 <br />
			<strong>Purchase Date:</strong> 12-31-2022 <br /><br />
			<strong>Seller:</strong> bob
			</div>
			<img src={shoe} alt="shoe" width="224px"/>
			<button type="button">Contact Support</button>
			<button type="button" >Track Package</button>
			<button type="button" >Leave the seller feedback</button>
			<button type="button" >Send a message to the seller</button>
			</div>

			<div className="order"> 
			<div className="orderDetails"> 
			<strong>Item:</strong> Blue White shoes<br />
			<strong>Order ID:</strong> 123-456-7890<br />
			<strong>Total:</strong> $123.45 <br />
			<strong>Purchase Date:</strong> 12-31-2022 <br /><br />
			<strong>Seller:</strong> bob
			</div>
			<img src={shoe} alt="shoe" width="224px"/>
			<button type="button">Contact Support</button>
			<button type="button" >Track Package</button>
			<button type="button" >Leave the seller feedback</button>
			<button type="button" >Send a message to the seller</button>
			</div>

			<div className="order"> 
			<div className="orderDetails"> 
			<strong>Item:</strong> Blue White shoes<br />
			<strong>Order ID:</strong> 123-456-7890<br />
			<strong>Total:</strong> $123.45 <br />
			<strong>Purchase Date:</strong> 12-31-2022 <br /><br />
			<strong>Seller:</strong> bob
			</div>
			<img src={shoe} alt="shoe" width="224px"/>
			<button type="button">Contact Support</button>
			<button type="button" >Track Package</button>
			<button type="button" >Leave the seller feedback</button>
			<button type="button" >Send a message to the seller</button>
			</div>


		</main>
		
	);
}