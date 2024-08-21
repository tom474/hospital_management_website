async function insertMockData(db) {
  try {
    const Document = db.model("Document");

    // Insert a mock document in MongoDB
    const document = new Document({
      entityType: "Patient",
      entityId: "1", // Example MySQL entity ID, ensure to map with MySQL entries
      documentType: "note",
      documentId: "some-document-id", // Replace with an actual ID or reference
      description: "Patient's initial consultation note."
    });

    await document.save();
    console.log("Mock data inserted into MongoDB!");
  } catch (error) {
    console.error("Error inserting mock data:", error);
  }
}

module.exports = { insertMockData };
