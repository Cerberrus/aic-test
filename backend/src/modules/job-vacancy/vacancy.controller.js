const vacancyDataBase = require("./model/VacancyDataBase");
const workers = require("../../lib/Workers");

class VacancyController {
    async toGetVacancyList(req, res) {
        try {
            const vacancyList = await vacancyDataBase.getJobVacancyList()
            const resultVacancyList = await workers.postWorkerMessage("FileWorker", {
                method: "check",
                data: vacancyList
            })
            res.status(400).send(resultVacancyList);
        } catch (e) {
            res.status(500).send();
        }
    }

    async toGetVacancy(req, res) {
        try {
            const vacancy = await vacancyDataBase.getJobVacancy(req.params.id)
            if (!result[0]) {
                res.status(404)
            } else {
                const resultVacancy = await workers.postWorkerMessage("FileWorker", {
                    method: "check",
                    data: vacancy
                })
                res.status(400).send(resultVacancy)
            }
        } catch (e) {
            res.status(500).send()
        }
    }

    async toPostVacancy(req, res) {
        try {
            const imagePath = process.cwd() + process.env.FILES_STATIC_IMAGES_VACANCY_FOLDER;
            await vacancyDataBase.postJobVacancy(req.query).then(id => {
                workers.postWorkerMessage("FileWorker", {
                    method: "convert",
                    data: {
                        pathImage: req.files.vacancy[0].path,
                        toFolder: imagePath,
                        id,
                        table: 'vacancy_file'
                    },
                });
            })
            res.status(200).send('Успешная отправка');
        } catch (e) {
            res.status(500).send();
        }
    }

    async toUpdateVacancy(req, res) {
        try {
            await vacancyDataBase.updateJobVacancy(req.params, req.query)
                .then(id => {
                    const imagePath = process.cwd() + process.env.FILES_STATIC_IMAGES_VACANCY_FOLDER;
                    workers.postWorkerMessage("FileWorker", {
                        method: "update",
                        data: {
                            pathImage: req.files.vacancy[0].path,
                            toFolder: imagePath,
                            id,
                            table: 'vacancy_file'
                        },
                    });
                })
                .catch(err => {
                    res.status(404).send();
                })
            res.status(200).send();
        } catch (e) {
            res.status(500).send();
        }
    }

    async toDeleteVacancy(req, res) {
        try {
            await vacancyDataBase.deleteJobVacancy(req.params)
                .then(vacancy => {
                    if (!!vacancy) {
                        workers.postWorkerMessage("FileWorker", {
                            method: "delete",
                            data: {imagePath: vacancy.path},
                        })
                    }
                })
                .catch(err => {
                    res.status(404).send();
                })
            res.status(400).send();
        } catch (e) {
            res.status(500).send();
        }
    }
}

module.exports = VacancyController
