const requestDataBase = require("./model/RequestDataBase");
const workers = require("../../lib/Workers");
const requestCheck = require("./model/RequestCheck");
const toGetJobRequestList = (req, res) => {
  try {
    requestDataBase.getList().then(async object =>{workers.postWorkerMessage("FileWorker", {
      method: "check",
      data: object.summaryList
    }, (result) => {                //  Послыаем запрос на проверку существования файлов
      res.status(200).send({statusList: object.statusList, summaryList:result})
    })
    })
  } catch (e) {
    res.status(404).send();
  }
};
const toPostJobRequest = (req, res) => {
  try {
    requestDataBase.post(req.query)
        .then(async id => {
      if(!!req.files)
        workers.postWorkerMessage("FileWorker", {
        method: "add",    // Посылаем запрос воркеру на добавление файла
        data: {
          paths: Array(req.files.summary[0].path),
          id,
          table: 'summary_file'
        },
      });
      res.status(200).json('ok');
    })
        .catch(err => {
          res.status(403).send();
        })
  } catch (e) {
    res.status(404).send();
  }
};
const toUpdateJobRequest = async (req, res) => {
  try {
    const data = await requestDataBase.updateSummaryStatus(req.params, req.query);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send();
  }
};
// const toUpdateJobRequestStatus = async (req, res) => {
//   try {
//     const data = await requestDataBase.updateSummaryStatus(req.params, req.query);
//     res.status(200).json(data);
//   } catch (e) {
//     res.status(404).send();
//   }
// };
const toDeleteJobRequest = (req, res) => {
  try {
    requestDataBase.delete(req.params).then(async request => {
      if(!!request){
        workers.postWorkerMessage("FileWorker", {
          method: "delete",
          data: {imagePath: request.path},
        })
      }
        res.status(200).json('ok');
    })

  } catch (e) {
    res.status(404).send();
  }
};

const toGetJobRequestStatusList = async (req, res) => {
  try {
    const data = await requestDataBase.getStatusList();
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send;
  }
};
const toPostJobRequestStatus = async (req, res) => {
  try {
    const data = await requestDataBase.postStatus(req.query);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send;
  }
};
const toUpdateJobRequestStatus = async (req, res) => {
  try {
    const data = await requestDataBase.updateSummaryStatus(req.params, req.query);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send;
  }
};
const toDeleteJobRequestStatus = async (req, res) => {
  try {
    const data = await requestDataBase.deleteStatus(req.params);
    res.status(200).json(data);
  } catch (e) {
    res.status(404).send;
  }
};

module.exports = {
  toGetJobRequestList,
  toPostJobRequest,
  toUpdateJobRequest,
  toDeleteJobRequest,
  toGetJobRequestStatusList,
  toPostJobRequestStatus,
  toUpdateJobRequestStatus,
  toDeleteJobRequestStatus,
};
