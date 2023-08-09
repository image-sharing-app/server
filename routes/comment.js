const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/CommentController.js");
const auth = require("../middlewares/authentication.js");

router.post(
  "/api/images/:imageId/comments",
  auth,
  CommentController.addComment
);

router.delete(
  "/api/images/:imageId/comments/:commentId",
  auth,
  CommentController.deleteComment
);

module.exports = router;
