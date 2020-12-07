const Check = require("../../../lib/Check");

class RequestCheck extends Check {
    async checkFieldsPost(req, res, next) {
        const result = await super.checkFieldsPost(req.query, {
            fieldsRequired: [
                "jobVacancyId",
                "name",
                "happyDate",
                "phoneNumber",
                "sex",
            ],
            fieldsNotRequired: ["email", "resumeText"],
        });
        if (result.checkExist.error === false && result.checkNull.error === false)
            next();
        else res.status(400).json(result);
    }

    async checkPost(req, res, next) {

    };

    async checkFileExist(requestList) {
        for (let request of requestList) {
            await super.checkFileExist(request.path)
                .then(async paths => {
                    if (paths.length > 0) request.path = await this.cutPath(paths, /C:\/GitHub\/aic-test\/backend\/uploads/i)
                    else delete request.path
                })
        }
        return requestList
    }
}

module.exports = new RequestCheck();