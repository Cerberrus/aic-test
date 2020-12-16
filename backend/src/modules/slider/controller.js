const sliderDataBase = require("./model/SliderDataBase");
const workers = require("../../lib/Workers");

const toGetSliderDataList = (req, res) => {
    try {
        sliderDataBase.getSliderDataList()
            .then(sliderList => {
                workers.postWorkerMessage("FileWorker", {
                    method: "check",
                    data: sliderList
                }, (result) => {                //  Послыаем запрос на проверку существования файлов
                    res.status(200).send(result)
                })
            })
    } catch (e) {
        res.status(404).send();
    }
};
const toPostSliderData = (req, res) => {
    try {
        const imagePath = (process.cwd() + process.env.FILES_STATIC_IMAGES_SLIDER_FOLDER);
        sliderDataBase.postSliderData(req.query)
            .then((id) => {
                workers.postWorkerMessage("FileWorker", {
                    method: "convert",
                    data: {                                             //
                        pathImage: req.files.slider[0].path,            //
                        toFolder: imagePath,                            // Посылаем запрос воркеру на конвертирование изображения
                        id,                                             //
                        table: 'slider_file'                            //
                    },
                });
                res.status(200).send('Успешная отправка');
            })
    } catch (e) {
        res.status(404).send();
    }
};
const toUpdateSliderData = (req, res) => {
    try {
        const imagePath = (process.cwd() + process.env.FILES_STATIC_IMAGES_SLIDER_FOLDER);
        sliderDataBase.updateSliderData(req.params,req.query)
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
                res.status(200).send('Успешная отправка');
            })
    } catch (e) {
        res.status(404).send();
    }
};
const toDeleteSliderData = (req, res) => {
    try {
        sliderDataBase.deleteSliderData(req.params)
            .then(slider => {
                workers.postWorkerMessage("FileWorker", {
                    method: "delete",                               //Посылаем запрос воркеру на удаление файла
                    data: {imagePath: slider.path},                 //
                })
                res.status(200).json();
            })
    } catch (e) {
        res.status(404).send();
    }
};

module.exports = {
    toGetSliderDataList,
    toPostSliderData,
    toDeleteSliderData,
    toUpdateSliderData
};