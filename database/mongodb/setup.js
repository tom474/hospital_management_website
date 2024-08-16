const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const { createCollections } = require("./collections");
const { insertMockData } = require("./mockData");

const mongoUri = "mongodb+srv://admin:admin1234@cluster0.w4wxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoDatabaseName = "isys2099_group9_app";
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

    await mongoClient.db(mongoDatabaseName).dropDatabase();
    console.log("MongoDB database cleared!");

    const mongoDb = mongoClient.db(mongoDatabaseName);
    await createCollections(mongoDb);
    if (process.argv.length > 2 && process.argv[2] === "--mock") {
      await insertMockData(mongoDb);
    }

    console.log("MongoDB database initialized!");
  } catch (error) {
    console.error("Error during MongoDB setup:", error);
  } finally {
    if (mongoClient) await mongoClient.close();
    console.log("MongoDB setup complete!");
  }
})();
