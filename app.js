const express = require("express");
const path = require("path");

const db = require("./data/database");
const routes = require("./routes/routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(routes);

db.connectDb().then(() => {
    app.listen(3000);
    console.log("http://localhost:3000/");
});
