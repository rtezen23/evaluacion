const express = require('express');

const {
	createFicha,
	getAllFichas,
	deleteFicha,
} = require('../controllers/fichas.controller.js');

const fichasRouter = express.Router();

fichasRouter.get('/', getAllFichas);
fichasRouter.post('/', createFicha);

module.exports = { fichasRouter };