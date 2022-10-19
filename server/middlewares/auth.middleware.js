const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

dotenv.config({ path: './config.env' });

const protectSession = catchAsync(async (req, res, next) => {
	let token;

	// Extract the token from headers
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	}

	if (!token) {
		return next(new AppError('Invalid session', 403));
	}

	// Ask JWT (library), if the token is still valid
	const decoded = await jwt.verify(token, process.env.JWT_SECRET);

	// { id, ... }

	// Check in db that user still exists
	// const user = await User.findOne({
	// 	where: { id: decoded.id, status: 'active' },
	// });

	const user = await User.findOne({
		where: { IDPERSONAL: decoded.id },
	});

	if (!user) {
		return next(
			new AppError('The owner of this token doesnt exist anymore', 403)
		);
	}

	// Grant access
	req.sessionUser = user;
	next();
});

module.exports = { protectSession };
