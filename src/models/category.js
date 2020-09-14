//Require mongoose lib
const mongoose = require('mongoose');

//Define the Law database schema
const categorySchema = new mongoose.Schema(
	{
		name: {
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
const Category = mongoose.model('Category', categorySchema);

//Export the module
module.exports = Category;