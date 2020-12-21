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
}

module.exports = new RequestCheck();