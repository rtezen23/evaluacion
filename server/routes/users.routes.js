const express = require('express');

const {
	getAllUsers,
	createUser,
	login,
	checkToken,
} = require('../controllers/users.controller.js');

const { protectSession } = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);
usersRouter.post('/login', login);

usersRouter.use(protectSession);
usersRouter.get('/check-token', checkToken);

module.exports = { usersRouter };