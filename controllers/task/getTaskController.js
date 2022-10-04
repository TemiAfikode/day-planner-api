const TaskModel = require('../../models/TaskModel');

module.exports = async function (req, res, next) {
    try {
        const task = await TaskModel.findById(req.params.id)

        if (!task) return res.status(404).send({isSuccessful: false, message: 'Task not found' });
        
        res.send({
            isSuccessful: true,
            message: "Successfully fetched task",
            data: task
        });
    } catch (error) {
        next(error);
    }
}