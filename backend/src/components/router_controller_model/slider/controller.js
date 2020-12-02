const manageSliderData = require('./model/ManageSliderData')
const workers = require('../../workers/Workers')
const SliderImagePath = require('./model/SliderImagePath')
const jobSliderDataCheckFields = require('./model/SliderDataCheckFieldsExist')

const toGetSliderDataList=async (req, res)=>{
    try{
        const data = await manageSliderData.getSliderDataList()
        const result = await SliderImagePath(data)
        res.status(200).json(result)
    }
    catch (e) {
        res.status(404).send()
    }
}
const toPostSliderData=async (req, res)=>{
    try{
        const imagePath = process.env.FILES_STATIC_IMAGES_SLIDER_FOLDER
        const data = await manageSliderData.postSliderData({
            title:req.query.title,
            imageDescription:req.query.imageDescription,
            imagePath:imagePath
        })
        const result = await SliderImagePath(data.sliderDataList)
        workers.postWorkerMessage(
            'ImageConverterWorker',
            {method:"convert", data:{pathImage:req.files.sliderImage[0].path, toFolder:imagePath}}
        )
        res.status(200).json(result)
    }
    catch (e) {
        res.status(404).send()
    }
}
const toDeleteSliderData=async (req, res)=>{
    try{
        const title = await manageSliderData.deleteSliderData(req.params)
        await workers.postWorkerMessage(
            'ImageConverterWorker',
            {method:"delete", data:{imagePath:process.env.FILES_STATIC_IMAGES_SLIDER_FOLDER, imageName:title}}
        )
        res.status(200).json()
    }
    catch (e) {
        res.status(404).send()
    }
}

module.exports = {
    toGetSliderDataList,
    toPostSliderData,
    toDeleteSliderData
}