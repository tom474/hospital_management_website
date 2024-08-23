const mongoose = require("mongoose");
const { documentSchema } = require("./schemas");

async function createCollections(dbUri) {
  try {
    // Connect to MongoDB using Mongoose with the correct URI
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Initialize the Document model with the schema
    mongoose.model("Document", documentSchema);

    console.log("Collections created successfully!");
  } catch (error) {
    console.error("Error creating collections:", error);
  } finally {
    // Close the Mongoose connection
    await mongoose.disconnect();
  }
}

module.exports = { createCollections };
