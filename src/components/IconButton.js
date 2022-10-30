import React from "react";
import "./IconButton.css";

export default function IconButton(props) {
	const { img, alt, role } = props;

	return (
		<button className={`${role}-button icon-button`} type="button">
			<img className={`${role}-icon icon`} src={img} alt={alt} />
		</button>
	);
}
