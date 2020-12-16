const multer = require("multer");
const path = require("path");
const translit = require("../../../lib/Translit");
const crypto = require('crypto')

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.cwd()+process.env.FILES_TEMP_FOLDER);
  },
  filename: async (req, file, cb) => {
    const extname = await path.extname(file.originalname)
    cb(
      null,
      `vacancy_${translit(req.query.title)}${extname}`
    );
  },
});

const uploader = multer({ storage, fileFilter }).fields([
  { name: "vacancy", maxCount: 1 },
]);

module.exports = async (req, res, next) => {
  await uploader(req, res, (err) => {
    if (err) {
      res.status(501).send("Ошибка загрузки файла")
    } else {
      console.log('File downloaded')
      next()
    }
  })
};