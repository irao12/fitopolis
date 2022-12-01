import React from "react";
import "./ImageCarousel.css";

export default function ImageCarousel(props) {
	const { images } = props;
	const [currImageIndex, setCurrImageIndex] = React.useState(0);
	const nextImage = () => {
		setCurrImageIndex((oldImageIndex) => {
			return (oldImageIndex + 1) % images.length;
		});
	};
	const prevImage = () => {
		setCurrImageIndex((oldImageIndex) => {
			oldImageIndex--;
			if (oldImageIndex < 0) {
				return images.length - 1;
			} else {
				return oldImageIndex;
			}
		});
	};

	return (
		images && (
			<div className="listing-image-carousel">
				{images.length > 1 && (
					<button
						className="previous-image-button carousel-button"
						type="button"
						onClick={prevImage}
					>{`<`}</button>
				)}
				<img
					className="carousel-image"
					src={`/listingImages/${images[currImageIndex]}`}
					alt="listing"
				/>
				{images.length > 1 && (
					<button
						className="next-image-button carousel-button"
						type="button"
						onClick={nextImage}
					>{`>`}</button>
				)}
			</div>
		)
	);
}
