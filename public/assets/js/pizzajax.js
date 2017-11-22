// Create a reference to div.container
let container = document.getElementsByClassName('container')[0];
// Create a reference to div#not-devoured element
let notDevoured = document.getElementById("not-devoured");
// Create a reference to div#devoured element
let devoured = document.getElementById("devoured");
// Create references to the form and it's submit button
let submitButton = document.getElementById("submit");
let newPizzaForm = document.getElementById("newPizzaForm");

// Prevent the default behavor of the form submit
newPizzaForm.addEventListener("submit", function (event) {
	event.preventDefault();
	addPizza();
});

// Call getPizzas when page loads
getPizzas();

// Use the axios library for HTTP requests
// This will run on page load.
function getPizzas() {
	// GET all the pizzas in the database
	axios({
		method: 'GET',
		url: '/pizza'
	}).then(function (response) {
		// The store the respinse (an array) in the responseArray variable.
		let responseArray = response.data;

		// Clear the divs that contain the pizzas
		notDevoured.innerHTML = "";
		devoured.innerHTML = "";

		// Map over the items in responseArray
		responseArray.map((item) => {
			// Create a text node that holds the name of each type of pizza
			let textnode = document.createTextNode(item.pizza_name);
			// Create a button and listen for click events
			let pizzaDiv = document.createElement("div");
			pizzaDiv.addEventListener("click", function (event) {
				event.preventDefault();
				devourAnEntirePizza(this);
			});
			// Append the text node above to the button element
			pizzaDiv.appendChild(textnode);
			// Set data-id to pizza's id in the database
			pizzaDiv.setAttribute("data-id", item.id);
			// Set data-devoured to the pizza's the devoured status in the database
			pizzaDiv.setAttribute("data-devoured", item.devoured);
			// Add the pizza class to all pizzas
			pizzaDiv.classList.add("pizza");

			// Check the devoured status for each pizza in the response and append to the proper column on the page
			if (item.devoured == '0') {
				notDevoured.appendChild(pizzaDiv);
			} else if (item.devoured == '1')
			// Append the button to div#not-devoured
				devoured.appendChild(pizzaDiv);
		});
	});
}

function addPizza() {
	// Create a reference to the input field
	let pizzaInput = document.getElementById("newPizza");
	// Get the value of the input
	let thePizza = pizzaInput.value

	// If the length of the pizza name is 0, alert the user, throw an error and prevent submission to the database
	if (thePizza.length < 1) {
		alert("Please enter the name of a pizza!");
		throw Error("Need name of a pizza!");
		return false;
	}
	// Add new pizza to the database
	axios({
		method: 'POST',
		url: '/add-pizza',
		data: {
			pizza_name: thePizza,
			devoured: 0
		}
	});
	// Refresh the pizza data on the page and reset the input field
	getPizzas();
	pizzaInput.value = "";
};

// Function that will update the devoured column when clicked.
function devourAnEntirePizza(element) {

	// Create variable that will be passed down to the SQL query issued by the ORM
	var devouredStatus = null;

	// Set devoured boolean to the opposite of its current state 
	if (element.dataset.devoured == 0) {
		devouredStatus = 1;
	} else {
		devouredStatus = 0;
	}

	// Update pizza in the database
	axios({
		method: 'PUT',
		url: '/devour-pizza',
		data: {
			update: [parseInt(devouredStatus), parseInt(element.dataset.id)]
		}
	}).then(function (results) {
		// Refresh the data that is displayed on the page.
		getPizzas();
	});
}