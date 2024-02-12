const mongoose = require('mongoose');
// connectDB is a function that calls the mongoose.connect method
// with our database_uri which is located in the dotenv file
// if there is an error, it logs the error to the console
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			autoIndex: true,
		});
	} catch (err) {
		console.log(err);
	}
};
module.exports = connectDB;
