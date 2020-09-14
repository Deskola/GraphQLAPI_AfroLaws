//Require mongoose lib
const mongoose = require('mongoose');

//Define the Law database schema
const subTribeSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		region: {
			type: String,
			required: true
		},
		tribeId: {
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
const SubTribe = mongoose.model('SubTribe', subTribeSchema);

//Export the module
module.exports = SubTribe;