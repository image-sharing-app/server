const express = require("express");
const router = express.Router();

const ImageController = require("../controllers/ImageController.js");
const auth = require("../middlewares/authentication.js");
const image = require("../middlewares/multerImage.js");

router.get("/api/images", auth, ImageController.findImages);
router.get("/api/images/:imageId", auth, ImageController.findImage);
router.post(
  "/api/images",
  auth,
  image.single("image"),
  ImageController.createImage
);
router.put("/api/images/:imageId", auth, ImageController.updateImage);
router.delete("/api/images/:imageId", auth, ImageController.deleteImage);

module.exports = router;
