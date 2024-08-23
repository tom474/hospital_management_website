const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const database = require("../models/database");

// Helper function to get a connection from the admin pool
async function getAdminConnection() {
    return await database.getAdminConnection();
}

// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL getAllPatients()");
        connection.release();
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get patient by id
const getPatientById = async (req, res) => {
    try {
        const patient_id = req.params.id;
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL getPatientByPatientId(?)", [patient_id]);
        connection.release();
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get patient by name
const getPatientByName = async (req, res) => {
    try {
        const search_name = req.params.name;
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL searchPatientsByName(?)", [`%${search_name}%`]);
        connection.release();
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Search patients by partial ID
const searchPatientsById = async (req, res) => {
    try {
        const id_search = req.params.id;
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL searchPatientsById(?)", [`%${id_search}%`]);
        connection.release();
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Search patients by partial name
const searchPatientsByName = async (req, res) => {
    try {
        const name_search = req.params.name;
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL searchPatientsByName(?)", [`%${name_search}%`]);
        connection.release();
        res.json(rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Create a new patient
const createPatient = async (req, res) => {
    try {
        const { first_name, last_name, birth_date, address, email, phone, allergies } = req.body;
        const connection = await getAdminConnection();
        const [rows] = await connection.query(
            "CALL createPatient(?, ?, ?, ?, ?, ?, ?)",
            [first_name, last_name, birth_date, address, email, phone, allergies]
        );
        connection.release();
        res.json({ message: "Patient created successfully", patient: rows[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update patient information
const updatePatient = async (req, res) => {
    try {
        const patient_id = req.params.id;
        const { first_name, last_name, birth_date, address, email, phone, allergies } = req.body;
        const connection = await getAdminConnection();
        const [rows] = await connection.query(
            "CALL updatePatientInformation(?, ?, ?, ?, ?, ?, ?, ?)",
            [patient_id, first_name, last_name, birth_date, address, email, phone, allergies]
        );
        connection.release();
        res.json({ message: "Patient updated successfully", patient: rows[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a patient
const deletePatient = async (req, res) => {
    try {
        const patient_id = req.params.id;
        const connection = await getAdminConnection();
        const [rows] = await connection.query("CALL deletePatient(?)", [patient_id]);
        connection.release();
        res.json({ message: "Patient deleted successfully", result: rows[0] });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Add doctor's note, diagnostic image, lab result, etc.
const addPatientDocument = async (req, res) => {
    const mongoClient = new MongoClient(process.env.MONGO_URI);

    try {
        const { patient_id, document_type, description, document_content, entity_type = 'Patient' } = req.body;

        // Connect to MongoDB
        await mongoClient.connect();
        const db = mongoClient.db(process.env.MONGO_DATABASE_NAME);
        const Document = db.collection('documents');

        // Generate a unique document ID
        const documentId = uuidv4();

        // Insert the document into MongoDB
        const document = {
            entityType: entity_type,
            entityId: patient_id,
            documentType: document_type,
            documentId: documentId,
            description: description,
            content: document_content
        };
        await Document.insertOne(document);

        // Insert the reference into MySQL
        const connection = await getAdminConnection();
        const [rows] = await connection.query(
            "CALL createDocumentReference(?, ?, ?, ?, ?)",
            [entity_type, patient_id, document_type, documentId, description]
        );
        connection.release();

        // Close MongoDB connection
        await mongoClient.close();

        res.json({ message: "Document added successfully", document: rows[0] });
    } catch (err) {
        await mongoClient.close();
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getAllPatients,
    getPatientById,
    getPatientByName,
    searchPatientsById,
    searchPatientsByName,
    createPatient,
    updatePatient,
    deletePatient,
    addPatientDocument,
};
