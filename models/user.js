const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Movie = require('../models/movie');
const crypto = require('crypto');

// Define our model
const UserSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	hash: String,
	salt: String,
	watchList: [{ type: Movie.MovieSchema }],
});

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	var hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
		.toString('hex');

	return this.hash === hash;
};

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
