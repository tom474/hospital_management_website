async function insertMockData(db) {
    const { Document } = db.models;
  
    // Insert a mock document in MongoDB
    const document = new Document({
      entityType: "Patient",
      entityId: "1", // Example MySQL entity ID, ensure to map with MySQL entries
      documentType: "note",
      documentId: "some-document-id",
      description: "Patient's initial consultation note."
    });
  
    await document.save();
  
    console.log("Mock data inserted into MongoDB!");
  }
  
  module.exports = { insertMockData };
  