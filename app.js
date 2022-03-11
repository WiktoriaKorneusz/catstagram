const express = require("express");
const path = require("path");

const db = require("./data/database");
const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(routes);

db.connectDb().then(() => {
    app.listen(PORT);
    // console.log("http://localhost:3000/");
});
