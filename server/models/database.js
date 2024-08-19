const mysql = require("mysql2/promise");

class Database {
	constructor() {
		if (Database.exists) {
			return Database.instance;
		}
		this.initDatabase();
		Database.instance = this;
		Database.exists = true;
		return this;
	}

	initDatabase() {
		this.poolAdmin = mysql.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER_ADMIN,
			password: process.env.DB_PASS_ADMIN,
			database: process.env.DB_DATABASE,
		});

		this.poolReceptionist = mysql.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER_RECEPTIONIST,
			password: process.env.DB_PASS_RECEPTIONIST,
			database: process.env.DB_DATABASE,
		});

		this.poolDoctor = mysql.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER_DOCTOR,
			password: process.env.DB_PASS_DOCTOR,
			database: process.env.DB_DATABASE,
		});

		this.poolNurse = mysql.createPool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER_NURSE,
			password: process.env.DB_PASS_NURSE,
			database: process.env.DB_DATABASE,
		});
	}
}

module.exports = new Database();
