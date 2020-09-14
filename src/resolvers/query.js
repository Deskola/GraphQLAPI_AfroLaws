//GraphQL query resolver for the schema
module.exports = {
	//Law model queries
	laws: async(parent, args, { models }) => {
		return await models.Law.find();
	},
	law: async(parent, args, { models }) => {
		return await models.Law.findById(args.id);
	},

	//Tribe model queries
	tribes: async(parent, args, { models }) => {
		return await models.Tribe.find();
	},
	tribe: async(parent, args, { models }) => {
		return await models.Tribe.findById(args.id);
	},

	//Categories queries
	categories: async(parent, args, { models }) => {
		return await models.Category.find();
	},
	category: async(parent, args, { models }) => {
		return await models.Category.findById(args.id);
	},

	//Subtribe queries
	subtribes: async(parent, args, { models }) => {
		return await models.SubTribe.find();
	},
	subtribe: async(parent, args, { models }) => {
		return await models.SubTribe.findById(args.id);
	},
};