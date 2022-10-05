const express = require('express');

const {
	getAllUsers,
	createUser,
	login,
} = require('../controllers/users.controller.js');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);
usersRouter.post('/login', login);

module.exports = { usersRouter };