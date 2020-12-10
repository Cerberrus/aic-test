const { workerData, parentPort } = require("worker_threads");
const ImageConverter = require("./ImageConverter");

parentPort.on("message", async (param) => {
  const imageConverter = new ImageConverter();
  const result = await imageConverter.manipulateImage(param);
  parentPort.postMessage(result);
});