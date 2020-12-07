const multer = require("multer");
const path = require("path");
const translit = require("../../../lib/Translit");

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "text/plain" ||
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"           //compare mimetype for filter
    ) {
        cb(null, true);                 //continue download file
    } else {
        cb(new Error('mimetype wrong')) //call error
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.cwd()+process.env.FILES_PRIVATE_FOLDER + "/summary");
    },
    filename: async (req, file, cb) => {
        const name = await translit(req.query.name);
        const date = new Date()
        cb(null, `summary_${name}_${date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()}_${await Math.random()}${path.extname(file.originalname)}`);

    },
});

const uploader = multer({storage, fileFilter, limits: {fileSize: 1024 * 1024 * 10}}) // size limit
    .fields([
        {name: "summary", maxCount: 1},
    ]);

module.exports = async (req, res, next) => {
    await uploader(req, res, (err) => {
        if (err) {
            res.status(501).send("Ошибка загрузки файла")
        } else {
            next()
        }
    })
};
