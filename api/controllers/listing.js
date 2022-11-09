const express = require("express");
const router = express.Router();
const db = require("../models");
const { Listing } = db;
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/listing
//    POST   /api/listing
//    GET    /api/listing/:id
//    PUT    /api/listing/:id
//    DELETE /api/listing/:id
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /listing comes from the file ./listing.js

router.get("/", (req, res) => {
	Listing.findAll({}).then((allListings) => res.json(allListings));
});

router.post("/", (req, res) => {
	let { data } = req.body;
	const imageURLs = [];

	// convert each image in base64 to a .png file and save it in the file system
	data.images.forEach((imageBase64) => {
		// obtain unique filename
		const uniqueFileName = uuidv4() + ".png";

		// obtain file data from imageBase64
		const base64Image = imageBase64.split(";base64,").pop();

		fs.writeFile(
			"./listingImages/" + uniqueFileName,
			base64Image,
			{ encoding: "base64" },
			(err) => {
				console.log("File created");
			}
		);

		// add url to an array, to save to database
		imageURLs.push(uniqueFileName);
	});

	// change data.images so the database only saves the url
	data.images = imageURLs;

	Listing.create(data)
		.then((newListing) => {
			res.status(201).json(newListing);
		})
		.catch((err) => {
			res.status(400).json(err);
			console.log(err);
		});
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	Listing.findByPk(id).then((listing) => {
		if (!listing) {
			return res.sendStatus(404);
		}

		res.json(listing);
	});
});

router.put("/:id", (req, res) => {
	const { id } = req.params;
	Listing.findByPk(id).then((listing) => {
		if (!listing) {
			return res.sendStatus(404);
		}

		const { data } = req.body;
		const imageURLs = [];

		// convert each image in base64 to a .png file and save it in the file system
		data.images.forEach((imageBase64) => {
			// obtain unique filename
			const uniqueFileName = uuidv4() + ".png";

			// obtain file data from imageBase64
			const base64Image = imageBase64.split(";base64,").pop();

			fs.writeFile(
				"./images/" + uniqueFileName,
				base64Image,
				{ encoding: "base64" },
				(err) => {
					console.log("File created");
				}
			);

			// add url to an array, to save to database
			imageURLs.push(uniqueFileName);
		});

		data.images = imageURLs;

		listing.data = data;
		listing
			.save()
			.then((updatedListing) => {
				res.json(updatedListing);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	});
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	Listing.findByPk(id).then((listing) => {
		if (!listing) {
			return res.sendStatus(404);
		}

		listing.destroy();
		res.sendStatus(204);
	});
});

module.exports = router;
