const multer  = require('multer')
const path = require('path')
const crypto = require('crypto');
const translit = require('../../../../lib/Translit')

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    if (file.mimetype === "text/plain" ||
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        console.log('File pass')
        cb(null, true);
    }
    else cb(null, false);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, process.env.FILES_PRIVATE_FOLDER+"/summary");
    },
    filename: async (req, file, cb) =>{
        const date = new Date()
        const hash = await crypto.createHash('md5').update(date.toString()).digest('hex');
        const name = await translit(req.query.name)
        cb(null, `summary_${name}_${hash}${path.extname(file.originalname)}`);
    }
})

const uploader = multer({storage, fileFilter}).fields([
    { name: 'summary', maxCount: 1 }
])

module.exports = uploader