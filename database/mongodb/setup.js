const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const { createCollections } = require("./collections");
const { insertMockData } = require("./mockData");

const connectionUri = "mongodb+srv://admin:admin1234@cluster0.w4wxs.mongodb.net/"; // MongoDB connection string
const databaseName = "HospitalManagementSystem";
const client = new MongoClient(connectionUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    console.log(`Connecting to MongoDB at "${connectionUri}"...`);
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");

    await client.db(databaseName).dropDatabase();
    console.log("Database cleared!");

    const dbUri = connectionUri + databaseName;
    await createCollections(dbUri);
    if (process.argv.length > 2 && process.argv[2] === "--mock") {
      await insertMockData(dbUri);
    }

    console.log("Database initialized!");
  } finally {
    await client.close();
  }
})().catch(console.dir);
