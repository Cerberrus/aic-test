const sliderDataBase = require("./model/SliderDataBase");
const workers = require("../../lib/Workers");
const ManageFiles = require('../file/ManageFiles')
class SliderController {
    async toGetSliderList(req, res){
        try{
            const sliderList = await sliderDataBase.getSliderDataList()
            const resultSliderList =
                await ManageFiles.prototype.checkExistFileList(`${process.cwd()}/uploads`, sliderList)
            res.status(200).send(resultSliderList)
        }
        catch (e) {
            res.status(500).send()
        }
    }

    async toGetSlider(req, res){
        try{
            const slider = await sliderDataBase.getSliderData(req.params.id)
            const resultSlider =
                await ManageFiles.prototype.checkExistFileList(`${process.cwd()}/uploads`, slider)
            res.status(200).send(resultSlider[0])
        }
        catch (e) {
            res.status(500).send();
        }
    }

    async toPostSlider(req,res){
        try{
            const imagePath = (process.cwd() + process.env.FILES_STATIC_IMAGES_SLIDER_FOLDER);
            await sliderDataBase.postSliderData(req.query).then(id => {
                workers.postWorkerMessage("FileWorker", {
                    method: "convert",
                    data: {                                             //
                        pathImage: req.files.slider[0].path,            //
                        toFolder: imagePath,                            // Посылаем запрос воркеру на конвертирование изображения
                        id,                                             //
                        table: 'slider_file'                            //
                    },
                });
            })
            res.status(200).send('Успешная отправка');
        }
        catch (e) {
            res.status(500).send();
        }

    }

    async toUpdateSlider(req,res){
        try{
            const imagePath = (process.cwd() + process.env.FILES_STATIC_IMAGES_SLIDER_FOLDER);
            await sliderDataBase.updateSliderData(req.params, req.query)
                .then((id) => {
                    workers.postWorkerMessage("FileWorker", {
                        method: "update",
                        data: {                                             //
                            pathImage: req.files.slider[0].path,            //
                            toFolder: imagePath,                            // Посылаем запрос воркеру на конвертирование изображения
                            id,                                             //
                            table: 'slider_file'                            //
                        },
                    });
                })
            res.status(200).send('Успешная отправка');
        }
        catch (e) {
            res.status(500).send();
        }
    }

    async toDeleteSlider(req,res){
        try{
            await sliderDataBase.deleteSliderData(req.params)
                .then(slider => {
                    workers.postWorkerMessage("FileWorker", {
                        method: "delete",                               //Посылаем запрос воркеру на удаление файла
                        data: {imagePath: slider.path},                 //
                    })
                })
            res.status(200).json();
        }
        catch (e) {
            res.status(500).json();
        }
    }
}

module.exports = SliderController;