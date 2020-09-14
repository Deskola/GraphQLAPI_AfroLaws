//Require mongoose lib
const mongoose = require('mongoose');

//Define the Law database schema
const lawSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true
		},
		consequence: {
			type: String,
			required: false
		},
		remedy: {
			type: String,
			required: false
		},
		authorId: {
			type: String,
			required: true
		},
		subtribe_id: {
			type: String,
			required:true
		},
		category_id: {
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
const Law = mongoose.model('Law', lawSchema);

//Export the module
module.exports = Law;