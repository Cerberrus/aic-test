const multer = require("multer");
const path = require("path");
const translit = require("../../../lib/Translit");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else cb(null, false);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILES_TEMP_FOLDER);
  },
  filename: async (req, file, cb) => {
    cb(
      null,
      `slider_${translit(req.query.title)}${path.extname(file.originalname)}`
    );
  },
});

const uploader = multer({ storage, fileFilter }).fields([
  { name: "sliderImage", maxCount: 1 },
]);

module.exports = uploader;