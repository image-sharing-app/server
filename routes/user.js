const express = require("express");
const router = express.Router();

const UserController = require("../controllers/UserController.js");
const auth = require("../middlewares/authentication.js");
const picture = require("../middlewares/multerPicture.js");

router.post("/api/register", UserController.register);
router.post("/api/login", UserController.login);

router.get("/api/users", auth, UserController.userProfile);
router.put("/api/users", auth, UserController.updateProfile);
router.put(
  "/api/users/picture",
  auth,
  picture.single("picture"),
  UserController.changePicture
);

module.exports = router;
