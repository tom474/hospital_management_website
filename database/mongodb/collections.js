const mongoose = require("mongoose");
const { documentSchema } = require("./schemas");

async function createCollections(db) {
  const Document = db.model("Document", documentSchema);

  console.log("Collections created!");

  return { Document };
}

module.exports = { createCollections };
