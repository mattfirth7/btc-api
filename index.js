const express = require('express')
const bodyParser = require('body-parser');
const services = require('./services');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Attaches the routes from the services folder to the /api route
app.use("/api", services);

const port = process.env.PORT || 4444;

app.listen(port, () =>
	console.log(`Express app listening on localhost:${port}`)
);