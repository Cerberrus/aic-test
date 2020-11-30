const path = require('path')
const { Worker } = require('worker_threads')

let instance = null
//
// let files = [{
//     path,
//     count
// }]


class Workers {
    constructor() {
        if (instance) {
            return instance
        }
        instance = this
        return instance;
    }

    initWorkers=async(files)=>{
        try {
            const workersList = []
            for(let file of files){
                for(let i = 0; i<file.count; i++){
                    const worker = await new Worker(file.path, {})
                    workersList.push({name:path.parse(file.path).name, id: worker.threadId, worker})
                }
            }
            this.workersList = workersList
            return true
        }
        catch (e) {
            throw new Error("xx")
        }
    }

    getWorkersList=()=>{
        return this.workersList
    }
    postNewWorker=async(file)=>{
        for(let i = 0; i<file.count; i++){
            const worker = await new Worker(file.path, {})
            this.workersList.push({name:path.parse(file.path).name, id: worker.threadId, worker})
        }
    }

    postWorkerMessage=(name, message)=>{
        for (let unit of this.workersList){
            if(unit.name === name){
                unit.worker.postMessage(message)
            }
        }
    }
}

module.exports = new Workers()