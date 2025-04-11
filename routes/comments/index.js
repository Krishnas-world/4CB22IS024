const express = require("express");
const router = express.Router();
const commentController = require("./controllers/commentController");

router.post("/comments", commentController.storeComments);
module.exports = router;

