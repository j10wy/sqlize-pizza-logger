const express = require('express');
const router = express.Router();
const pizza_model = require('../models/pizzas');

// Render the index page
router.get('/', function (req, res) {
	res.render('index');
});

// Get pizzas in the database
router.get("/pizza", function getPizzas(request, response) {

	pizza_model.selectAll(function (results) {
		response.json(results);
	});

});

// Add a new pizza to the database
router.post("/add-pizza", function addPizza(request, response) {

	pizza_model.insertOne(request.body, function (results) {
		response.json(results);
	});

});

// Update the devoured field in the database
router.put("/devour-pizza", function addPizza(request, response) {

	pizza_model.updateOne(request.body.update, function (results) {
		response.json(results);
	});

});

module.exports = router;