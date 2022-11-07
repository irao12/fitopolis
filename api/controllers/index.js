const express = require("express");
const router = express.Router();

// Load each controller
const listingController = require("./listing.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use("/listing", listingController);

module.exports = router;
