//GraphQL schema
const {gql} = require('apollo-server-express');

module.exports = gql `
	scalar DateTime

	type Law{
		id: ID!
		content: String!
		remedy: String
		consequence: String
		subtribe_id: String!
		authorId: User!
		category_id: String!
		createdAt: DateTime!
		updatedAt: DateTime!
	}
	type Tribe{
		id: ID!
		name: String!
		language: String!		
		createdAt: DateTime!
		updatedAt: DateTime!
	}
	type SubTribe{
		id: ID!
		name: String!
		region: String!
		tribeId: String!		
		createdAt: DateTime!
		updatedAt: DateTime!
	}
	type Category{
		id: ID!
		name: String!		
		createdAt: DateTime!
		updatedAt: DateTime!
	}
	type User{
		id: ID!
		username: String!
		email: String!
		password: String!
		avatar: String
		laws: [Law!]!		
		createdAt: DateTime!
		updatedAt: DateTime!
	}
	type Query{		
		laws: [Law!]!
		law(id: ID!): Law!
		tribes: [Tribe!]!
		tribe(id: ID!): Tribe!
		categories: [Category!]!
		category(id: ID!): Category!
		subtribes: [SubTribe!]!
		subtribe(id: ID!): SubTribe!
	}
	type Mutation{
		newLaw(content: String!, remedy: String, consequence: String,authorId: String!, 
		 subtribe_id: String!, category_id: String!): Law!
		updateLaw(id: ID!, content: String!, consequence: String!, remedy: String, subtribe_id: String!, category_id: String!): Law!
		deleteLaw(id: ID!): Boolean!

		newTribe(name: String!, language: String!): Tribe!
		updateTribe(id: ID!, name: String!, language: String!): Tribe!
		deleteTribe(id: ID!): Boolean!

		newCategory(name: String!): Category!
		updateCategory(id: ID!, name: String!): Category!
		deleteCategory(id: ID!): Boolean!

		newSubTribe(name: String!, region: String!, tribeId: String!): SubTribe!
		updateSubTribe(id: ID!, name: String!, region: String!): SubTribe!
		deleteSubTribe(id: ID!): Boolean!

		signUp(username: String!, email: String!, password: String!): String!
		signIn(username: String!, password: String!): String!

	}
`;