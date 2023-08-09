const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../uploads/image"));
  },
  filename: (req, file, callback) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    callback(null, Date.now() + "-" + fileName);
  },
});

const imageUpload = multer({ storage });

module.exports = imageUpload;
