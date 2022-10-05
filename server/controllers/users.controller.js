const { User } = require('../models/user.model');
// const bcrypt = require('bcryptjs');
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const createUser = catchAsync(async (req, res, next) => {
    const { apellidos, nombres, cargo, usuario, password } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        apellidos,
        nombres,
        cargo,
        usuario,
        password: hashPassword,
    });

    newUser.password = undefined;

    res.status(201).json({
        status: 'success',
        newUser,
    });
});

const login = catchAsync(async (req, res, next) => {
    const { usuario, password } = req.body;
    
    const user = await User.findOne({
        where: {
            usuario,
        },
    });

    if (!user) return next(new AppError('Invalid user', 400))

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) return next(new AppError('Invalid password', 400))

    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
    
    res.status(200).json({
        status: 'success',
        user,
        token,
    });
});

const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll();

    res.status(200).json({
        status: 'success',
        users,
    });

});

module.exports = {
    createUser,
    login,
    getAllUsers,
};