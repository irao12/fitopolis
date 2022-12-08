import React from "react";
import "./Button.css";

export default function Button({ className, text, handleClick }) {
	return (
		<button
			className={`interactive-button ${className}`}
			onClick={handleClick}
		>
			{text}
		</button>
	);
}
