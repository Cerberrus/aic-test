const fs = require('fs')

class Check {
    async checkFieldsPost(object, {fieldsRequired, fieldsNotRequired}) {
        const checkExist = await Check.#checkExist(object, fieldsRequired);
        const checkNull = await Check.#checkNull(object);
        if(!!fieldsNotRequired) await Check.#addFields(object, fieldsNotRequired);
        return {checkExist, checkNull};
    };

    async checkFileExist(pathList) {
        const path = pathList
            ? pathList
                .filter(path => fs.existsSync(path))
            : false
        return path
    }

    async cutPath(pathList, folder){
        return pathList.map(path => path.split(folder)[1])
    }

    static #addFields(object, fields) {
        if (fields) {
            for (let field of fields) {
                if (!object[field]) {
                    object[field] = null;
                }
            }
        }
    }

    static #checkExist(object, fields) {
        let error = null;
        let passed = false;
        const fieldStack = [];
        for (let field of fields) {
            if (field in object) {
            } else {
                fieldStack.push(field);
            }
            passed = true;
        }
        if (fieldStack.length > 0) error = true;
        else error = false;
        return {
            error,
            passed,
            errorList: fieldStack,
            message: "Field not exist list",
        };
    }

    static #checkNull(object) {
        let error = null;
        let passed = false;
        const fieldStack = [];
        for (let obj in object) {
            if (
                object[obj] === null ||
                object[obj] === "null" ||
                object[obj] === ""
            ) {
                fieldStack.push(obj);
            }
            passed = true;
        }
        if (fieldStack.length > 0) error = true;
        else error = false;
        return {
            error,
            passed,
            errorList: fieldStack,
            message: "Null object list",
        };
    }
}

module.exports = Check;