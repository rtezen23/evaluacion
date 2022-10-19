const { Cartera } = require('../models/cartera.model');

const getAllCarteras = async (req, res, next) => {

    const carteras = await Cartera.findAll();

    res.status(200).json({
        status: 'success',
        carteras,
    });

};  

module.exports = {
    getAllCarteras
};