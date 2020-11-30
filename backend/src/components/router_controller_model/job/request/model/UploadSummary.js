const multer  = require('multer')
const path = require('path')
const translit = require('../../../../lib/Translit')

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "text/plain") {
        cb(null, true);
    }
    cb(null, false);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, process.env.FILES_PRIVATE_FOLDER+"/summary");
    },
    filename: async (req, file, cb) =>{
        cb(null, `summary_${translit(req.params.name)}_${path.extname(file.originalname)}`);
    }
})

const uploader = multer({storage, fileFilter}).fields([
    { name: 'summary', maxCount: 1 }
])

module.exports = uploader