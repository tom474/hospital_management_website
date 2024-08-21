const mysql = require("mysql2/promise");
require("dotenv").config(); // Load environment variables from .env file

class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        // Initialize database pools
        this.initDatabase();

        // Set the singleton instance
        Database.instance = this;
    }

    initDatabase() {
        try {
            this.poolAdmin = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER_ADMIN,
                password: process.env.DB_PASS_ADMIN,
                database: process.env.DB_DATABASE,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });

            this.poolReceptionist = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER_RECEPTIONIST,
                password: process.env.DB_PASS_RECEPTIONIST,
                database: process.env.DB_DATABASE,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });

            this.poolDoctor = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER_DOCTOR,
                password: process.env.DB_PASS_DOCTOR,
                database: process.env.DB_DATABASE,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });

            this.poolNurse = mysql.createPool({
                host: process.env.DB_HOST,
                user: process.env.DB_USER_NURSE,
                password: process.env.DB_PASS_NURSE,
                database: process.env.DB_DATABASE,
                waitForConnections: true,
                connectionLimit: 10,
                queueLimit: 0
            });

            console.log("Database pools initialized successfully.");
        } catch (error) {
            console.error("Error initializing database pools:", error);
            throw error;
        }
    }

    // Optional: Methods to get a connection from a specific pool
    getAdminConnection() {
        return this.poolAdmin.getConnection();
    }

    getReceptionistConnection() {
        return this.poolReceptionist.getConnection();
    }

    getDoctorConnection() {
        return this.poolDoctor.getConnection();
    }

    getNurseConnection() {
        return this.poolNurse.getConnection();
    }
}

module.exports = new Database();
