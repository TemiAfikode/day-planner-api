const mongoose = require('mongoose'); 

const TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Task can not be empty'],
        maxLength: [150, 'The task task length must be less than or equal to 150 characters.'],
        minLength: [5, 'The task task length must be greater than or equals to 5 characters.'],
        trim: true
    },
    status: {
        type: String,
        enum: ['done', 'cancelled', 'pending'],
        default: 'pending',
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date can not be empty'],   
    },
    dueTime: {
        type: Number,
        required: [true, 'Due time can not be empty'],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: [true, 'Task creator is not allowed to be empty'],
    },
    sharedTo: [String]
}, {
    timestamps: true,
})

module.exports = mongoose.model('task', TaskSchema);