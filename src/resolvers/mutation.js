//import libs
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
	AuthenticationError,
	ForbiddenError
} = require('apollo-server-express');
require('dotenv').config();
const gravatar = require('../util/gravatar');

//GraphQL mutation resolver for the schema
module.exports = {
	//Law model mutations
	newLaw: async(parent, args, { models }) => {
		return await models.Law.create({
			content: args.content,
			remedy: args.remedy,
			authorId: args.authorId,
			consequence: args.consequence,
			subtribe_id: args.subtribe_id,
			category_id: args.category_id
		});
	},
	deleteLaw: async(parent, { id }, { models }) => {
		try{
			await models.Law.findOneAndRemove({ _id: id });
			return true;
		}catch (err){
			return false;
		}
	},
	updateLaw: async(parent, {id, content, consequence, remedy, subtribe_id, category_id }, {models}) =>{
		return await models.Law.findOneAndUpdate(
			{
				_id: id,
			},
			{
				$set: { 
					content,
					consequence,
					remedy,
					subtribe_id,
					category_id
				}
			},					
			{
				new: true
			}
		);
	},

	//Tribe Model Mutation
	newTribe: async(parent, args, { models }) => {
		return await models.Tribe.create({
			name: args.name,
			language: args.language			
		});
	},
	deleteTribe: async(parent, { id }, { models }) => {
		try{
			await models.Tribe.findOneAndRemove({ _id: id });
			return true;
		}catch (err){
			return false;
		}
	},
	updateTribe: async(parent, {id, name, language }, {models}) =>{
		return await models.Tribe.findOneAndUpdate(
			{
				_id: id,
			},
			{
				$set: { 
					name,
					language
				}
			},					
			{
				new: true
			}
		);
	},

	//Category Model Mutation
	newCategory: async(parent, args, { models }) => {
		return await models.Category.create({
			name: args.name,					
		});
	},
	deleteCategory: async(parent, { id }, { models }) => {
		try{
			await models.Category.findOneAndRemove({ _id: id });
			return true;
		}catch (err){
			return false;
		}
	},
	updateCategory: async(parent, {id, name, language }, {models}) =>{
		return await models.Category.findOneAndUpdate(
			{
				_id: id,
			},
			{
				$set: { 
					name					
				}
			},					
			{
				new: true
			}
		);
	},

	//subtribe Model Mutation
	newSubTribe: async(parent, args, { models }) => {
		return await models.SubTribe.create({
			name: args.name,
			region: args.region,
			tribeId: args.tribeId					
		});
	},
	deleteSubTribe: async(parent, { id }, { models }) => {
		try{
			await models.SubTribe.findOneAndRemove({ _id: id });
			return true;
		}catch (err){
			return false;
		}
	},
	updateSubTribe: async(parent, {id, name, region }, {models}) =>{
		return await models.SubTribe.findOneAndUpdate(
			{
				_id: id,
			},
			{
				$set: { 
					name,
					region					
				}
			},					
			{
				new: true
			}
		);
	},

	//SignUp mutation
	signUp: async(parent, { username, email, password }, {models}) =>{
		//normalize email address
		email = email.trim().toLowerCase();
		//hash the password
		const hashed = await bcrypt.hash(password, 10);
		//create a gravatar url
		const avatar = gravatar(email);
		try{
			const user = await models.User.create({
				username,
				email,
				avatar,
				password: hashed
			});

			//create and return the json web token
			return jwt.sign({ id: user._id}, process.env.JWT_SECRET);

		}catch(err){
			console.log(err)
			//throw err if account fails to be created
			throw new Error('Error creating accout');
		}
	},

	//SignIn mutation
	signIn: async(parent, { username, password }, {models}) =>{
		// if (email) {
		// 	//normalize email addr
		// 	email = email.trim().toLowerCase();
		// }

		const user = await models.User.findOne({
			username 
		});

		//if no user is foun, throw an authentication error
		if (!user) {
			throw new AuthenticationError('Error signing in');
		}

		//if the password don't match, throw an auth error
		const valid = await bcrypt.compare(password, user.password);
		if (!valid) {
			throw new AuthenticationError('Error signing in');
		}

		//create and return the json web token
		return jwt.sign({ id: user._id}, process.env.JWT_SECRET);
	}

}