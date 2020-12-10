const vacancyDataBase = require("./model/VacancyDataBase");
const workers = require("../../lib/Workers");


const toGetJobVacancyList = (req, res) => {
    try {
        vacancyDataBase.getJobVacancyList()
            .then(async vacancyList => {
                workers.postWorkerMessage("ImageConverterWorker", {
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
        const data = await vacancyDataBase.getJobVacancy(req.params);
        res.status(200).json(data);
    } catch (e) {
        res.status(404).send();
    }
};
const toPostJobVacancy = (req, res) => {
    try {
        const imagePath = process.cwd()+process.env.FILES_STATIC_IMAGES_VACANCY_FOLDER;
        vacancyDataBase.postJobVacancy(req.query).then(id => {
            workers.postWorkerMessage("ImageConverterWorker", {
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
        console.log(e);
    }
};
const toDeleteJobVacancy = async (req, res) => {
    try {
        vacancyDataBase.deleteJobVacancy(req.params)
            .then(vacancy => {
                workers.postWorkerMessage("ImageConverterWorker", {
                    method: "delete",
                    data: {imagePath: vacancy.path},
                })
                res.status(200).send();
            })
    } catch (e) {
        res.status(404).send();
    }
};

module.exports = {
    toGetJobVacancyList,
    toGetJobVacancy,
    toPostJobVacancy,
    toDeleteJobVacancy,
};
