const express = require("express");
const router = express.Router();
const db = require("../models");
const { order: Order, listing: Listing } = db;
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const { Op } = require("sequelize");

// This is a simple example for providing basic CRUD routes for
// a resource/model. It provides the following:
//    GET    /api/order
//    POST   /api/order
//    GET    /api/order/:orderID
//    PUT    /api/order/:orderID
//    DELETE /api/order/:orderID
//
// The full URL's for these routes are composed by combining the
// prefixes used to load the controller files.
//    /api comes from the file ../app.js
//    /order comes from the file ./order.js

router.get("/", (req, res) => {
	Order.findAll({ order: [["updatedAt", "DESC"]] }).then((allOrders) =>
		res.json(allOrders)
	);
});

router.post("/", (req, res) => {
	let { data } = req.body;

	for (listing of data.orderDetails.items) {
		Listing.findByPk(listing.listingID).then((listingInstance) => {
			if (!listingInstance.isActive) {
				res.status(400).json({
					error: "one of the listings is not active",
				});
			}
			if (listingInstance.quantity - listingInstance.quantity < 0) {
				res.status(400).json({
					error: "quantity desired exceeds maximum",
				});
			}
		});
	}

	Order.create(data)
		.then((newOrder) => {
			res.status(201).json(newOrder);
		})
		.catch((err) => {
			res.status(400).json(err);
		});

	for (listing of data.orderDetails.items) {
		Listing.findByPk(listing.listingID).then((listingInstance) => {
			listingInstance.quantity -= Number(listing.quantity);
			if (listingInstance.quantity === 0) {
				listingInstance.isActive = false;
			}
			listingInstance.save();
		});
	}
});

router.get("/search/:searchQuery", (req, res) => {
	const { searchQuery } = req.params;

	Order.findAll({
		where: {
			[Op.or]: [
				{
					orderDetails: {
						[Op.iRegexp]: `.*${searchQuery}.*`,
					},
				},
			],
		},
		order: [["updatedAt", "DESC"]],
	}).then((allOrders) => res.json(allOrders));
});

router.get("/:orderID", (req, res) => {
	const { orderID } = req.params;
	Order.findByPk(orderID).then((order) => {
		if (!order) {
			return res.sendStatus(404);
		}

		res.json(order);
	});
});

router.put("/:orderID", (req, res) => {
	const { orderID } = req.params;
	Order.findByPk(orderID).then((order) => {
		if (!order) {
			return res.sendStatus(404);
		}

		const { data } = req.body;

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

router.delete("/:orderID", (req, res) => {
	const { orderID } = req.params;
	Order.findByPk(orderID).then((order) => {
		if (!order) {
			return res.sendStatus(404);
		}

		order.destroy();
		res.sendStatus(204);
	});
});

module.exports = router;
