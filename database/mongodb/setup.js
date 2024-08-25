const mongoose = require("mongoose");

// MongoDB connection URI
const connectionUri =
	"mongodb+srv://admin:admin1234@cluster0.g8xxn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Database name
const databaseName = "HospitalManagementSystem";

const connectMongoDB = async () => {
	try {
		const conn = await mongoose.connect(connectionUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: databaseName,
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
	}
};

connectMongoDB();

module.exports = connectMongoDB;
