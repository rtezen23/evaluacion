const express = require('express');

const {
	createFicha,
	getAllFichas,
	deleteFicha,
	getFichasByUser
} = require('../controllers/fichas.controller.js');

const fichasRouter = express.Router();

fichasRouter.get('/', getAllFichas);
fichasRouter.post('/', createFicha);
fichasRouter.get('/:monitor', getFichasByUser);

module.exports = { fichasRouter };