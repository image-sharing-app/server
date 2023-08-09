const express = require("express");
const router = express.Router();

const LikeController = require("../controllers/LikeController.js");
const auth = require("../middlewares/authentication.js");

router.post("/api/images/:imageId/likes", auth, LikeController.addLike);

router.delete(
  "/api/images/:imageId/likes/:likeId",
  auth,
  LikeController.deleteLike
);

module.exports = router;
