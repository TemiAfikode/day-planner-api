const TaskModel = require('../../models/TaskModel');

module.exports = async function (req, res, next) {
    try {
        const tasks = await TaskModel.find({createdBy: req.user._id}).sort({createdAt: -1})

        res.send({
            isSuccessful: true,
            message: "Successfully fetched user's tasks",
            data: tasks
        });
    } catch (error) {
        next(error);
    }
}