const jwt = require('jwt-simple');
const User = require('../models/user');
const keys = require('../config/keys');

const tokenForUser = (user) => {
	const timestamp = Math.round(Date.now() / 1000);
	return jwt.encode(
		{
			sub: user.id,
			iat: timestamp,
			exp: timestamp + 5 * 60 * 60,
		},
		keys.TOKEN_SECRET
	);
};

exports.signin = (req, res) => {
	// TODO
};

exports.currentUser = (req, res) => {
	// TODO
};

exports.signup = async (req, res, next) => {
	// TODO
};
