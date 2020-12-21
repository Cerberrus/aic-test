const path = require("path");
const { Worker } = require("worker_threads");

let instance = null;

class Workers {
  constructor() {
    if (instance) {       //При существовании созданного экземпляра, возращаем ранее созданный экземпляр
      return instance;
    }
    instance = this;
    return instance;
  }

  initWorkers = async (files) => {    //Инициализация воркеров, полученных в параметре
    try {
      const workersList = [];
      for (let file of files) {
        for (let i = 0; i < file.count; i++) {
          const worker = await new Worker(file.path, {});
          workersList.push({
            name: path.parse(file.path).name,
            id: worker.threadId,
            worker,
          });
        }
      }
      this.workersList = workersList;
      return true;
    } catch (e) {
      throw new Error("xx");
    }
  };

  getWorkersList = () => {            //Отдает всех воркеров
    return this.workersList;
  };
  getWorker = (name) => {             //Отдает определенного воркера по имени
    for (let unit of this.workersList) {
      if (unit.name === name) {
        return  unit.worker
      }
    }
  };
  postNewWorker = async (file) => {   //Добавляет новый воркер
    for (let i = 0; i < file.count; i++) {
      const worker = await new Worker(file.path, {});
      this.workersList.push({
        name: path.parse(file.path).name,
        id: worker.threadId,
        worker,
      });
    }
  };

  postWorkerMessage = (name, message, callback = null) => { //Отправляет воркеру сообщение
    const requestId = Math.random()
    for (let unit of this.workersList) {
      if (unit.name === name) {
        unit.worker.postMessage({id: requestId, message});
        this.CurrentWorker = unit.worker
        break
      }
    }
    this.CurrentWorker.once("message", async ({id, result}) => {
        if(callback !== null && id === requestId) callback(result)
    });
  }
}

module.exports = new Workers();
