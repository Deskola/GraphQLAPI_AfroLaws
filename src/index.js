// index.js
// This is the main entry point of our application
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Local module imports
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;



const app = express();

//connect to db
db.connect(DB_HOST);

//get the user info from JWT
const getUser = token => {
	if (token) {
		try{
			//return the usser info form the token
			return jwt.verify(token, process.env.JWT_SECRET);

		}catch(err){
			//if there is a problem with the token
			throw new Error('Session invalid');
		}
	}
}

//Apollo Server setup
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: () =>{
		//add db models to the context
		return { models };
	}
});

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({app, path:'/api'});

app.listen(port, () => 
	console.log(`Server listening on port ${port}${server.graphqlpath}`));
