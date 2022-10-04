const joi = require('joi');

module.exports = function (body) {
    const schema = joi.object({
        email: joi.string().required().email(),
        firstname: joi.string().trim().required(),
        lastname: joi.string().trim().required(),
        password: joi.string().trim().required(),
    })

    const {error,value} = schema.validate(body)
    if (error) {
        return {
            isValid: false,
            error: {message: error.details[0].message, path: error.details[0].path[0]},
            body: value,
        }
    }
    return {
        isValid: true,
        error: null,
        body: value
    }
}