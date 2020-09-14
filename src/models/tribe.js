//Require mongoose lib
const mongoose = require('mongoose');

//Define the Law database schema
const tribeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		language: {
			type: String,
			required: true
		}		
	},
	{
		//Assigns createdAt and UpdatedAt fields with a Date type
		timestamps: true
	}

);

//Define the Law model with the schema
const Tribe = mongoose.model('Tribe', tribeSchema);

//Export the module
module.exports = Tribe;