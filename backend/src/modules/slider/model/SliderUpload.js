const multer = require("multer");
const path = require("path");

const translit = require("../../../lib/Translit");

const fileFilter = (req, file, cb) => {     // Фильтр форматов изображения
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else cb(null, false);
};

const storage = multer.diskStorage({    // Загрузчик файла
  destination: (req, file, cb) => {
    cb(null, process.cwd()+process.env.FILES_TEMP_FOLDER);
  },
  filename: async (req, file, cb) => {
    cb(
      null,
      `slider_${translit(req.query.title)}${path.extname(file.originalname)}`
    );
  },
});

const uploader = multer({ storage, fileFilter }).fields([
  { name: "slider", maxCount: 1 },
]);

module.exports = async (req, res, next) => {    // Промежуточная функция загрузки отправляемого изображения
  await uploader(req, res, (err) => {
    if (err) {
      res.status(501).send("Ошибка загрузки файла")
    } else {
      next()
    }
  })
};