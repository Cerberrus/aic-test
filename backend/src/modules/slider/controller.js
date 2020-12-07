const sliderDataBase = require("./model/SliderDataBase");
const sliderCheck = require("./model/SliderCheck");
const workers = require("../../lib/Workers");

const toGetSliderDataList =(req, res) => {
  try {
    sliderDataBase.getSliderDataList()
        .then(async sliderList => {
          res.status(200).send(await sliderCheck.checkFileExist(sliderList))
        })
  } catch (e) {
    res.status(404).send();
  }
};
const toPostSliderData = (req, res) => {
  try {
    const imagePath = (process.cwd()+process.env.FILES_STATIC_IMAGES_SLIDER_FOLDER);
    sliderDataBase.postSliderData(req.query).then((id) => {
      workers.postWorkerMessage("ImageConverterWorker", {
        method: "convert",
        data: {
          pathImage: req.files.slider[0].path,
          toFolder: imagePath,
          id,
          table: 'slider_file'},
      });
      res.status(200).send('Успешная отправка');
    })
  } catch (e) {
    console.log(e)
    res.status(404).send();
  }
};
const toDeleteSliderData = (req, res) => {
  try {
    sliderDataBase.deleteSliderData(req.params)
        .then(slider => {
          workers.postWorkerMessage("ImageConverterWorker", {
            method: "delete",
            data: {imagePath: slider.path},
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
};