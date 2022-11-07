const express = require('express');

const {
	getAllBase,
	createBase,
	getAvailableBase,
	deleteBase,
	getBaseById
} = require('../controllers/base.controller.js');

const { baseExists } = require('../middlewares/base.middleware');
const baseRouter = express.Router();

baseRouter.get('/', getAvailableBase);
baseRouter.get('/all', getAllBase);
baseRouter.post('/', createBase);
baseRouter.get('/:user', getBaseById);

baseRouter
	.use('/:id', baseExists)
	.route('/:id')
	.delete(deleteBase)

module.exports = { baseRouter };