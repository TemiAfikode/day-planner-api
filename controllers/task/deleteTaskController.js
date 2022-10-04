const TaskModel = require('../../models/TaskModel');

module.exports = async function (req, res, next) {
    try {
        const task = await TaskModel.findById(req.params.id)
        if (!task) return res.status(404).send({ isSuccessful: false, message: 'Task not found' });

        if (req.user._id.toString() !== task.createdBy.toString()) return res.status(403).send({ isSuccessful: false, message: 'You are not allow to perform this action' });
        
        task.delete();
        await task.save();

        res.send({
            isSuccessful: true,
            message: "Successfully deleted task",
        });
    } catch (error) {
        next(error);
    }
}