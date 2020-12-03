const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const translit = require("../../../lib/Translit");

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype);
    if (
        file.mimetype === "text/plain" ||
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        cb(null, true);
    } else {
        cb(new Error('xxx'))
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.FILES_PRIVATE_FOLDER + "/summary");
    },
    filename: async (req, file, cb) => {
        const date = new Date();
        const hash = await crypto
            .createHash("md5")
            .update(date.toString())
            .digest("hex");
        const name = await translit(req.query.name);
        cb(null, `summary_${name}_${date.getDate().toString()}_${hash}${path.extname(file.originalname)}`);
    },
});

const uploader = multer({storage, fileFilter, limits: {fileSize: 1024 * 1024 * 2}})
    .fields([
        {name: "summary", maxCount: 1},
    ]);

module.exports = async (req, res, next) => {
    let error = false
    await uploader(req, res, (err) => {
        if (err) {
            error = true
            res.status(501).send("Ошибка загрузки файла")
        } else {
            next()
        }
    })
};
