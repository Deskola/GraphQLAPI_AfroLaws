//Require mongoose lib
const mongoose = require('mongoose');

module.exports = {
	connect: DB_HOST => {
		//Use mongo driver's updated URL string parser
		mongoose.set('useNewUrlParser', true);
		//use findOneAndUpdate() in place of findAndModify()
		mongoose.set('useFindAndModify',false);
		//use createIndex() in place of ensureIndex()
		mongoose.set('useCreateIndex', true);
		//use new server discovery and monitoring engine
		mongoose.set('useUnifiedTopology', true);
		//Connect to DB
		mongoose.connect(DB_HOST);
		//Log error if we fail to connect
		mongoose.connection.on('error', err => {
			console.error(err);
			console.log(
				'MongoDB connection error. Please make sure MongoDB is running'
			);
			process.exit();
		});
	},
	close: () => {
		mongoose.connection.close();
	}
};