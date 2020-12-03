const multer = require("multer");
const path = require("path");

const fileFilter = (req, file, cb) => {
  if ("title" in req.query) {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/svg+xml" ||
      file.mimetype === "image/svg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  } else cb(null, false);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.FILES_STATIC_FOLDER);
  },
  filename: async (req, file, cb) => {
    cb(null, `logo_${path.extname(file.originalname)}`);
  },
});

const uploader = multer({ storage, fileFilter }).fields([
  { name: "logo", maxCount: 1 },
]);

module.exports = uploader;
