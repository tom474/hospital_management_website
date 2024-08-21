const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const { createCollections } = require("./collections");
const { insertMockData } = require("./mockData");

const mongoUri = "mongodb+srv://admin:admin1234@cluster0.w4wxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoDatabaseName = "HospitalManagementSystem";
const mongoClient = new MongoClient(mongoUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    console.log(`Connecting to MongoDB at "${mongoUri}"...`);
    await mongoClient.connect();
    await mongoClient.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    // Drop existing database if it exists
    await mongoClient.db(mongoDatabaseName).dropDatabase();
    console.log(`Database "${mongoDatabaseName}" cleared!`);

    // Initialize collections and insert mock data if requested
    const mongoDb = mongoClient.db(mongoDatabaseName);
    await createCollections(mongoDb);
    
    if (process.argv.includes("--mock")) {
      await insertMockData(mongoDb);
    }

    console.log("MongoDB database initialized!");
  } catch (error) {
    console.error("Error during MongoDB setup:", error);
  } finally {
    await mongoClient.close();
    console.log("MongoDB connection closed. Setup complete!");
  }
})();
