const express = require("express");
const router = express.Router();
const commentController = require("./controllers/commentController");

router.get("/comments", commentController.getComments);
router.post("/comments", commentController.storeComments);
module.exports = router;

