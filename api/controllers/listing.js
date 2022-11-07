const express = require("express");
const router = express.Router();
const db = require("../models");
const { Listing } = db;

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
	let { content } = req.body;
	Listing.create({ content })
		.then((newListing) => {
			res.status(201).json(newListing);
		})
		.catch((err) => {
			res.status(400).json(err);
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

		listing.content = req.body.content;
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
