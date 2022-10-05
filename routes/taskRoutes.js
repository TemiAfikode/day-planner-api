const express = require('express');
const addTaskController = require('../controllers/task/addTaskController');
const deleteTaskController = require('../controllers/task/deleteTaskController');
const getTaskController = require('../controllers/task/getTaskController');
const getTasksController = require('../controllers/task/getTasksController');
const getUserTaskController = require('../controllers/task/getUserTaskController');
const shareTaskController = require('../controllers/task/shareTaskController');
const updateTaskController = require('../controllers/task/updateTaskController');
const authorize = require('../middleware/authorize');
const {taskCap, noSharing} = require('../middleware/basicRestrictions');

const router = express.Router();

router.post('/share/:id',authorize, noSharing,  shareTaskController)
router.get('/my-tasks/:id',authorize, getUserTaskController)

router.route('/')
    .get(authorize, getTasksController)
    .post(authorize, addTaskController)
router.route('/:id')
    .get(authorize, getTaskController)
    .delete(authorize, deleteTaskController)
    .put(authorize, updateTaskController)

module.exports = router