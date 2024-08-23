const mongoose = require("mongoose");
const { documentSchema } = require("./schemas");

async function insertMockData(dbUri) {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Initialize the Document model with the schema
    const Document = mongoose.model("Document", documentSchema);

    // Insert a mock document in MongoDB
    const document = new Document({
      entityType: "Patient",
      entityId: "1", // Example MySQL entity ID, ensure to map with MySQL entries
      documentType: "note",
      documentId: "some-document-id", // Replace with an actual ID or reference
      description: "Patient's initial consultation note.",
    });

    await document.save();
    console.log("Mock data inserted into MongoDB!");
  } catch (error) {
    console.error("Error inserting mock data:", error);
  } finally {
    // Close the Mongoose connection
    await mongoose.disconnect();
  }
}

module.exports = { insertMockData };
