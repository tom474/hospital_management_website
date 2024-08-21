const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for documents linked to various entities
const documentSchema = new Schema({
  entityType: { type: String, enum: ["Patient", "Staff", "Appointment"], required: true },
  entityId: { type: String, required: true }, // Reference to the MySQL entity ID
  documentType: { type: String, required: true },
  documentId: { type: String, required: true }, // Could be an S3 URL, GridFS ID, etc.
  description: { type: String }
});

module.exports = { documentSchema };
