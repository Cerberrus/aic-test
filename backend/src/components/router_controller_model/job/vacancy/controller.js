const manage = require('./model/ManageVacancy')
const workers = require('../../../workers/Workers')
const vacancyImagePath = require('./model/VacancyImagePath')

const toGetJobVacancyList=async (req, res)=>{
    try{
        const data = await manage.getJobVacancyList()
        const result = await vacancyImagePath(data.vacancyList)
        res.status(200).json({vacancyList: result})
    }
    catch (e) {
        res.status(409).send()
    }
}
const toGetJobVacancy=async (req, res)=>{
    try{
        const data = await manage.getJobVacancy(req.params)
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send()
    }
}
const toPostJobVacancy=async (req, res)=>{
    try{
        const imagePath = process.env.FILES_STATIC_IMAGES_VACANCY_FOLDER
        const data = await manage.postJobVacancy(
            {
                title:req.query.title,
                ImageDescription:req.query.imageDescription,
                imagePath:imagePath
            })
        workers.postWorkerMessage(
            'ImageConverterWorker',
            {method:"convert", data:{pathImage:req.files.vacancyImage[0].path, toFolder:imagePath}}
        )
        res.status(200).json(data)
    }
    catch (e) {
        res.status(404).send()
    }
}
const toDeleteJobVacancy=async (req, res)=>{
    try{
        const title = await manage.deleteJobVacancy(req.params)
        await workers.postWorkerMessage(
            'ImageConverterWorker',
            {method:"delete", data:{imagePath:process.env.FILES_STATIC_IMAGES_VACANCY_FOLDER, imageName:title}}
        )
        res.status(200).send()
    }
    catch (e) {
        res.status(404).send()
    }
}

module.exports = {
    toGetJobVacancyList,
    toGetJobVacancy,
    toPostJobVacancy,
    toDeleteJobVacancy
}