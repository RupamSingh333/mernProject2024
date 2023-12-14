const express = require("express");
const categoryRoute = express();
const bodyParser = require("body-parser");
const auth = require("../middleware/auth");
categoryRoute.use(express.static("public"));
categoryRoute.use(bodyParser.json());
categoryRoute.use(bodyParser.urlencoded({ extended: true }));

const categoryController = require("../controllers/categoryController");
//Create Category Route
categoryRoute.post(
    "/create-category",
    auth,
    categoryController.createCategory
);

//View All Category
categoryRoute.get("/view-category", auth, categoryController.viewCategory);

//Update Category
categoryRoute.post("/update-category", auth, categoryController.updateCategory);

//Delete Category
categoryRoute.get("/delete-category", auth, categoryController.deleteCategory);


module.exports = categoryRoute;