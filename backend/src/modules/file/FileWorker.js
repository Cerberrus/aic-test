const { workerData, parentPort } = require("worker_threads");
const ImageConverter = require("./FileConverter");

parentPort.on("message", ({id, message}) => {     //Принимает id и сообщение
  try{
    const imageConverter = new ImageConverter()
    imageConverter.manipulateImage(message).then(result => {
      parentPort.postMessage({id, result});             //возвращает заданный id и сообщение
    })
  }
  catch (e) {
    console.log(e)
  }
});