// Requires
const express = require("express");
const path = require("path");
const db = require("./data/database");
const routes = require("./routes/routes");

// dotenv setup
require("dotenv").config()

const app = express();

// Sets the port of the environment variable.
const PORT = process.env.PORT || 5000;

// Set the view engine and view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Use the express json and urlencoded 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the express static static method to use the public folder
app.use(express.static("public"));

app.use(routes);

// Opens a connection to the database and starts listening for port.
db.connectDb().then(() => {
    app.listen(PORT);
});
