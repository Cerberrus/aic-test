const { workerData, parentPort } = require('worker_threads')
const ImageConverter = require('./ImageConverter')

parentPort.on("message", async (param) => {
    console.log('Worker get message')
    const imageConverter = new ImageConverter()
    const result = await imageConverter.manipulateImage(param)
    parentPort.postMessage({ result })
});