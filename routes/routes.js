const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});
router.get("/add-image", (req, res) => {
    res.render("add-image");
});

module.exports = router;
