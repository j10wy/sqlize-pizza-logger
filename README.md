# :pizza: Logger
A pizza logging app following the MVC design pattern using MySQL, Node, Express, Handlebars and a custom ORM.

[DEMO](http://ucbx-orm-pizza-logger.herokuapp.com/)

### Instructions and Overview

The app will load all pizzas in the database. The front-end code will split the pizzas by the boolean value stored in the `devoured` column of the pizza_db table in the database. To devour a pizza, click a pizza in the left-side column. Once on the devoured side, click the pizza name again to set 'devoured` to false, moving it back to the left side.

You can view all of the pizzas in the database in JSON format by visiting:

[https://ucbx-orm-pizza-logger.herokuapp.com/pizza](https://ucbx-orm-pizza-logger.herokuapp.com/pizza). 

### Note on the front-end code
Rather than use jQuery, I decided to use [Axios](https://www.npmjs.com/package/axios) to handle the HTTP requests. Here is an example that handle PUT requests. You can view the front-end JS code [here](https://github.com/jeffreylowy/orm-pizza-logger/blob/464736105ca3bb37b138558e197578b647b89e35/public/assets/js/pizzajax.js#L104). All of the JS code was written in vanilla JS.

```javascript
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
```

