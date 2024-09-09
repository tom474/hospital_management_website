const mysql = require("mysql2/promise");
const readline = require("readline");
const fs = require("fs").promises;

const stdin = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function promptUser(promptMessage) {
	return new Promise((resolve) => {
		stdin.question(promptMessage, (answer) => {
			resolve(answer);
		});
	});
}

async function setValidationPolicy(connection) {
	try {
		await connection.query("SET GLOBAL validate_password.policy = 0");
		console.log("Validation policy set to 0");
	} catch (err) {
		console.error("Failed to set validation policy:", err);
	}
}

async function executeSetupScript(connection, scriptPath) {
	try {
		let script = await fs.readFile(scriptPath, "utf-8");

		// Clean up the script for execution
		script = script
			.replace(/DELIMITER \$\$/g, "")
			.replace(/END \$\$/g, "END;")
			.replace(/DELIMITER ;/g, "");

		await connection.query(script);
		console.log(`Script executed successfully: ${scriptPath}`);
	} catch (err) {
		console.error(`Error executing script ${scriptPath}:`, err);
	}
}

(async () => {
	try {
		const user = await promptUser("Enter MySQL root username: ");
		const password = await promptUser(`Enter MySQL password for "${user}": `);

		const connection = await mysql.createConnection({
			user: user,
			host: "localhost",
			password: password,
			multipleStatements: true,
		});

		console.log("Connected to MySQL database as ID " + connection.threadId);

		// Check if validate_password.policy exists
		const [rows] = await connection.query("SHOW VARIABLES LIKE 'validate_password.policy'");
		if (rows.length === 0) {
			console.log("validate_password.policy not found. Skipping policy setting.");
		} else {
			await setValidationPolicy(connection);
		}

		// Disable foreign key checks before executing scripts
		await connection.query("SET FOREIGN_KEY_CHECKS = 0");

		// Determine which scripts to run based on command-line arguments
		const scripts = [
			"reset.sql",
			"./init/schema.sql",
			"./init/indexing.sql",
			"./init/users.sql",
			"./init/procedures.sql",
			"./init/triggers.sql",
			"./init/views.sql",
			...(process.argv.includes("--mock") ? ["./init/mockData.sql"] : []),
		];

		// Execute all the setup scripts in sequence
		for (const script of scripts) {
			await executeSetupScript(connection, script);
		}

		// Re-enable foreign key checks after executing scripts
		await connection.query("SET FOREIGN_KEY_CHECKS = 1");

		await connection.end(); // Close the connection
		console.log("Database initialized successfully!");
	} catch (err) {
		console.error("Error during database setup:", err.stack);
	} finally {
		stdin.close(); // Close the readline interface
	}
})();
