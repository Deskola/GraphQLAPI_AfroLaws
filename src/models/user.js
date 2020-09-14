//Require mongoose lib
const mongoose = require('mongoose');

//Define the Law database schema
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			index: { unique: true }
		},
		email: {
			type: String,
			required: true,
			index: { unique: true }
		},
		password: {
			type: String,
			required: true
		},
		avatar: {
			type: String			
		}
	},
	{
		//Assigns createdAt and UpdatedAt fields with a Date type
		timestamps: true
	}

);

//Define the Law model with the schema
const User = mongoose.model('User', userSchema);

//Export the module
module.exports = User;