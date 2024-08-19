const { Schema } = require("mongoose");

const documentSchema = new Schema({
  entityType: { type: String, enum: ["Patient", "Staff", "Appointment"], required: true },
  entityId: { type: String, required: true }, // String to store MySQL entity ID
  documentType: { type: String, required: true },
  documentId: { type: String, required: true }, // Can be a reference to an S3 URL, GridFS, etc.
  description: { type: String }
});

module.exports = { documentSchema };
