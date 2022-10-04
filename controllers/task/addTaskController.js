const TaskModel = require('../../models/TaskModel');
const taskValidation = require('../../validation/taskValidation');

module.exports = async function (req, res, next) {
    try {
        let payload = taskValidation(req.body);
        if (!payload.isValid) {
            return res.status(400).send({
                isSuccessful: false,
                error: payload.error
            })
        }
        payload.body.createdBy = req.user._id;
        
        const task = new TaskModel(payload.body)
        await task.save()

        res.send({
            isSuccessful: true,
            message: 'New task has been created successfully.',
            data: task
        });
    } catch (err) {
        console.log(err)
        next(err);
    }
}