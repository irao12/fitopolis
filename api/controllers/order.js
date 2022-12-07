const express = require("express");
const router = express.Router();
const db = require("../models");
const { order: Order } = db;
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { Op } = require("sequelize");

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
	Order.findAll({ order: [["updatedAt", "DESC"]] }).then((allOrders) =>
		res.json(allOrders)
	);
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

		if (!fs.existsSync("./client/public/listingImages")) {
			fs.mkdirSync("./client/public/listingImages");
		}

		fs.writeFile(
			"./client/public/listingImages/" + uniqueFileName,
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

	Order.create(data)
		.then((newOrder) => {
			res.status(201).json(newOrder);
		})
		.catch((err) => {
			res.status(400).json(err);
			console.log(err);
		});
});

router.get("/search/:searchQuery", (req, res) => {
	const { searchQuery } = req.params;

	Order.findAll({
		where: {
			[Op.or]: [
				{
					title: {
						[Op.iRegexp]: `.*${searchQuery}.*`,
					},
				},
				{
					description: {
						[Op.iRegexp]: `.*${searchQuery}.*`,
					},
				},
			],
		},
		order: [["updatedAt", "DESC"]],
	}).then((allOrders) => res.json(allOrders));
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	Order.findByPk(id).then((order) => {
		if (!order) {
			return res.sendStatus(404);
		}

		res.json(order);
	});
});

router.put("/:id", (req, res) => {
	const { id } = req.params;
	Order.findByPk(id).then((order) => {
		if (!order) {
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

		order.data = data;
		order
			.save()
			.then((updatedOrder) => {
				res.json(updatedOrder);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	});
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	Order.findByPk(id).then((order) => {
		if (!order) {
			return res.sendStatus(404);
		}

		order.destroy();
		res.sendStatus(204);
	});
});

module.exports = router;
