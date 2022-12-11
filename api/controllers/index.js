const express = require("express");
const router = express.Router();

// Load each controller
const listingController = require("./listing.js");
const authController = require("./auth.js");
const orderController = require("./order.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/listing", listingController);
router.use("/auth", authController);
router.use("/order", orderController);

module.exports = router;
