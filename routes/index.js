const express = require("express");
const router = express.Router();

const user = require("./user.js");
const image = require("./image.js");
const like = require("./like.js");
const comment = require("./comment.js");

router.use(user);
router.use(image);
router.use(like);
router.use(comment);

module.exports = router;
