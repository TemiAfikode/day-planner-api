const joi = require('joi');

module.exports = function (body) {
    const schema = joi.object({
        task: joi.string().min(5).max(150).required(),
        dueDate: joi.date().required(),
        dueTime: joi.string().required(),
        status: joi.string().valid('done', 'cancelled', 'pending').default('pending'),
        tag: joi.string().trim().optional()
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