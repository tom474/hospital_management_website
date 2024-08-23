const mysql = require("mysql2/promise");
require("dotenv").config();

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.initDatabase();

    Database.instance = this;
  }

  initDatabase() {
    try {
      this.poolAdmin = mysql.createPool(this.getDatabaseConfig("DB_USER_ADMIN", "DB_PASS_ADMIN"));
      this.poolReceptionist = mysql.createPool(this.getDatabaseConfig("DB_USER_RECEPTIONIST", "DB_PASS_RECEPTIONIST"));
      this.poolDoctor = mysql.createPool(this.getDatabaseConfig("DB_USER_DOCTOR", "DB_PASS_DOCTOR"));
      this.poolNurse = mysql.createPool(this.getDatabaseConfig("DB_USER_NURSE", "DB_PASS_NURSE"));

      console.log("Database pools initialized successfully.");
    } catch (error) {
      console.error("Error initializing database pools:", error);
      throw error;
    }
  }

  getDatabaseConfig(userEnv, passEnv) {
    return {
      host: process.env.DB_HOST,
      user: process.env[userEnv],
      password: process.env[passEnv],
      database: process.env.DB_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    };
  }

  async getConnection(pool) {
    return pool.getConnection();
  }

  getAdminConnection() {
    return this.getConnection(this.poolAdmin);
  }

  getReceptionistConnection() {
    return this.getConnection(this.poolReceptionist);
  }

  getDoctorConnection() {
    return this.getConnection(this.poolDoctor);
  }

  getNurseConnection() {
    return this.getConnection(this.poolNurse);
  }
}

module.exports = new Database();
