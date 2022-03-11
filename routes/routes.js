const express = require("express");
const router = express.Router();
// const multer = require("multer");
const cloudinary = require("../utilities/cloudinary");
const upload = require("../utilities/multer");
const db = require("../data/database");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

// const storageConfig = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, "public/posts");
//     },
//     filename: (req, file, callback) => {
//         callback(null, Date.now() + "-" + file.originalname);
//     },
// });

// const upload = multer({ storage: storageConfig });

router.get("/", async (req, res) => {
    const posts = await db.getDb().collection("posts").find().toArray();
    res.render("index", { posts: posts });
});
router.get("/add-image", (req, res) => {
    res.render("add-image");
});
router.get("/posts/:id", async (req, res) => {
    const id = new ObjectId(req.params.id);
    const post = await db.getDb().collection("posts").findOne({ _id: id });
    res.render("comments", { post: post });
});
router.get("/comments/:id", async (req, res) => {
    const id = req.params.id;
    const comments = await db
        .getDb()
        .collection("comments")
        .find({ postId: id })
        .toArray();
    res.json(comments);
});
router.post("/add-comment", async (req, res) => {
    const data = req.body;
    await db.getDb().collection("comments").insertOne(data);
    res.json({ message: "success" });
});
// router.post("/images", upload.single("image"), async (req, res) => {
//     const uploadImage = req.file;
//     const uploadData = req.body;
//     const data = {
//         ...uploadData,
//         date: new Date(),
//         image: uploadImage.filename,
//     };
//     console.log(data)
//     // await db.getDb().collection("posts").insertOne(data);
//     res.redirect("/");
// });

router.post("/images", upload.single("image"), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const url = `v${result.version}/${result.public_id}.${result.format}`;
        const uploadData = req.body;
        const data = {
            ...uploadData,
            date: new Date(),
            image: url,
        };
        await db.getDb().collection("posts").insertOne(data);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
