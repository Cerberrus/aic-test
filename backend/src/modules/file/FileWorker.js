const { workerData, parentPort } = require("worker_threads");
const ImageConverter = require("./FileConverter");

parentPort.on("message", async ({id, message}) => {
  const imageConverter = new ImageConverter();
  const result = await imageConverter.manipulateImage(message);
  parentPort.postMessage({id, result});
});