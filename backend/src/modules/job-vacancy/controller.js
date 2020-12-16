const vacancyDataBase = require("./model/VacancyDataBase");
const workers = require("../../lib/Workers");


const toGetJobVacancyList = (req, res) => {
    try {
        vacancyDataBase.getJobVacancyList()
            .then(async vacancyList => {
                workers.postWorkerMessage("FileWorker", {
                    method: "check",
                    data: vacancyList
                }, (result) => {
                    res.status(200).send(result)
                })
            })
    } catch (e) {
        res.status(409).send();
    }
};
const toGetJobVacancy = async (req, res) => {
    try {
        vacancyDataBase.getJobVacancy(req.params.id)
            .then(async vacancy =>{
                workers.postWorkerMessage("FileWorker", {
                    method: "check",
                    data: vacancy
                }, (result) => {
                    res.status(200).send(result)
                })
            })
    } catch (e) {
        res.status(404).send();
    }
};
const toPostJobVacancy = (req, res) => {
    try {
        const imagePath = process.cwd()+process.env.FILES_STATIC_IMAGES_VACANCY_FOLDER;
        vacancyDataBase.postJobVacancy(req.query).then(id => {
            workers.postWorkerMessage("FileWorker", {
                method: "convert",
                data: {
                    pathImage: req.files.vacancy[0].path,
                    toFolder: imagePath,
                    id,
                    table: 'vacancy_file'
                },
            });
            res.status(200).send('Успешная отправка');
        })
    } catch (e) {
        res.status(404).send();
        console.error(e);
    }
};
const toUpdateJobVacancy = async (req,res)=>{
    vacancyDataBase.updateJobVacancy(req.params,req.query)
        .then(id => {
            const imagePath = process.cwd()+process.env.FILES_STATIC_IMAGES_VACANCY_FOLDER;
            workers.postWorkerMessage("FileWorker", {
                method: "update",
                data: {
                    pathImage: req.files.vacancy[0].path,
                    toFolder: imagePath,
                    id,
                    table: 'vacancy_file'
                },
            });
            res.status(200).send();
        })
}
const toDeleteJobVacancy = async (req, res) => {
    try {
        vacancyDataBase.deleteJobVacancy(req.params)
            .then(vacancy => {
                if(!!vacancy){
                    workers.postWorkerMessage("FileWorker", {
                        method: "delete",
                        data: {imagePath: vacancy.path},
                    })
                    res.status(200).send();
                }
                res.status(404).send();
            })
    } catch (e) {
        res.status(404).send();
    }
};

module.exports = {
    toGetJobVacancyList,
    toGetJobVacancy,
    toPostJobVacancy,
    toUpdateJobVacancy,
    toDeleteJobVacancy,
};
