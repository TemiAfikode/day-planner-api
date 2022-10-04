const TaskModel = require('../../models/TaskModel');

module.exports = async function (req, res, next) {
    try {
        const tasks = await TaskModel.find({})
        res.send({
            isSuccessful: true,
            message: "Successfully fetched tasks",
            data: tasks
        });
    } catch (error) {
        next(error);
    }
}