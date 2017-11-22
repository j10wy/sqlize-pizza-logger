const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();

// Set view engine to handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());

// Use the express.static built-in middleware to serve static files
app.use(express.static('public/'));

// Call Heroku's environment variable, if false use port 3000
const PORT = process.env.PORT || 3000;

// Require controller middleware.
const pizza_controller = require('./controllers/pizza_controller');
app.use('/', pizza_controller);

app.listen(PORT);