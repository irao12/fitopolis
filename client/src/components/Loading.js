import React from "react";
import { TailSpin } from "react-loader-spinner";
import "./Loading.css";
export default function Loading() {
	return (
		<div className="loading-message">
			<TailSpin
				height="80"
				width="80"
				color="#2E2252"
				ariaLabel="tail-spin-loading"
				radius="1"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
			<h3>Loading </h3>
		</div>
	);
}
