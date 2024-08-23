const mongoose = require("mongoose");
const { documentSchema } = require("./schemas");

async function createCollections(db) {
  try {
    // Initialize the Document model with the schema
    db.model("Document", documentSchema);

    console.log("Collections created successfully!");
  } catch (error) {
    console.error("Error creating collections:", error);
  }
}

module.exports = { createCollections };
