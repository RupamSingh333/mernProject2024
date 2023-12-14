const express = require("express");
const contactRoute = express();
const bodyParser = require("body-parser");
contactRoute.use(express.static("public"));
contactRoute.use(bodyParser.json());
contactRoute.use(bodyParser.urlencoded({ extended: true }));

const contactController = require("../controllers/contactController");

//contactUs Route
contactRoute.post(
    "/contact-us",
    contactController.contactUs
);

module.exports = contactRoute;