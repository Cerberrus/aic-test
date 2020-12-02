class CheckFields {
    checkFieldsPost = async (object, {fieldsRequired, fieldsNotRequired}) => {
        console.log(object)
        const checkExist = await this.__checkExist(object, fieldsRequired)
        const checkNull = await this.__checkNull(object)
        await this.__addFields(object, fieldsNotRequired)
        return {checkExist, checkNull}
    }

    __addFields(object, fields) {
        if (fields) {
            for (let field of fields) {
                if (!object[field]) {
                    object[field] = null
                }
            }
        }
    }

    __checkExist(object, fields) {
        let error = null
        let passed = false
        const fieldStack = []
        for (let field of fields) {
            console.log(field)
            if (field in object) {
            } else {
                fieldStack.push(field)
            }
            passed = true
        }
        if (fieldStack.length > 0) error = true
        else error = false
        return {error,passed, errorList: fieldStack, message: 'Field not exist list'}
    }

    __checkNull(object) {
        let error = null
        let passed = false
        const fieldStack = []
        for (let obj in object) {
            if (object[obj] === null || object[obj] === "null" || object[obj] === "") {
                fieldStack.push(obj)
            }
            passed = true
        }
        if (fieldStack.length > 0) error = true
        else error = false
        return {error,passed, errorList: fieldStack, message: 'Null object list'}
    }
}

module.exports = CheckFields