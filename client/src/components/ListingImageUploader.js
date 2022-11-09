import React from "react";
import ImageUploading from "react-images-uploading";
import "./ListingImageUploader.css";

export default function ListingImageUploader({
	value,
	onChange,
	maxImageCount,
}) {
	return (
		<ImageUploading
			multiple
			value={value}
			onChange={onChange}
			maxNumber={maxImageCount}
			dataURLKey="data_url"
			acceptType={["jpg", "png"]}
		>
			{({
				imageList,
				onImageUpload,
				onImageRemove,
				isDragging,
				dragProps,
			}) => (
				// write your building UI
				<div className="upload__image-wrapper">
					<div className="image-container">
						{imageList.map((image, index) => (
							<div key={index} className="image-item">
								<img src={image.data_url} alt="" />
								<button
									className="remove-image-btn"
									onClick={() => onImageRemove(index)}
									type="button"
								>
									X
								</button>
							</div>
						))}

						{imageList.length < 3 && (
							<button
								className="add-image-btn"
								type="button"
								style={isDragging ? { color: "red" } : null}
								onClick={onImageUpload}
								{...dragProps}
							>
								+
							</button>
						)}
					</div>
				</div>
			)}
		</ImageUploading>
	);
}
