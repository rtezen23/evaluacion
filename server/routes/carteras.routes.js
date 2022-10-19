const express = require('express');

const {
	getAllCarteras,
} = require('../controllers/carteras.controller.js');

const carterasRouter = express.Router();

carterasRouter.get('/', getAllCarteras);

module.exports = { carterasRouter };