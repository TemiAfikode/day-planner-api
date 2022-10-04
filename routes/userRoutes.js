const express = require('express');
const addUserController = require('../controllers/user/addUserController');
const deleteUserController = require('../controllers/user/deleteUserController');
const getRefreshTokenController = require('../controllers/user/getRefreshTokenController');
const getUserController = require('../controllers/user/getUserController');
const getUsersController = require('../controllers/user/getUsersController');
const loggedUserController = require('../controllers/user/loggedUserController');
const loginUserController = require('../controllers/user/loginUserController');
const logoutUserController = require('../controllers/user/logoutUserController');
const updateUserController = require('../controllers/user/updateUserController');
const upgradeUserController = require('../controllers/user/upgradeUserController');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.get('/profile', authorize, loggedUserController);
router.get('/logout', authorize, logoutUserController);
router.get('/pro', authorize, upgradeUserController);
router.get('/refresh-token', getRefreshTokenController);

router.route('/')
    .get(authorize, getUsersController)
    .post(addUserController)
    .delete(authorize, deleteUserController)
    .put(authorize, updateUserController)

router.route('/:id')
    .get(authorize, getUserController)

router.post('/login', loginUserController);

module.exports = router