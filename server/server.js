require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const patientRouter = require("./routes/patientRoutes");
const staffRouter = require("./routes/staffRoutes");
const departmentRouter = require("./routes/departmentRoutes");
const treatmentRouter = require("./routes/treatmentRoutes");
const scheduleRouter = require("./routes/scheduleRoutes");
const jobHistoryRouter = require("./routes/jobHistoryRoutes");
const appointmentRouter = require("./routes/appointmentRoutes");

const mysqlSetup = require("../database/mysql/setup"); // Import the MySQL setup script
const mongoSetup = require("../database/mysql/setup"); // Import the MongoDB setup script

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/patient", patientRouter);
app.use("/staff", staffRouter);
app.use("/department", departmentRouter);
app.use("/treatment", treatmentRouter);
app.use("/schedule", scheduleRouter);
app.use("/job-history", jobHistoryRouter);
app.use("/appointment", appointmentRouter);

app.get("/", (req, res) => {
	return res.json({ message: "The server is running!" });
});

async function initializeDatabases() {
	try {
		await mysqlSetup(); // Initialize MySQL database
		await mongoSetup(); // Initialize MongoDB database
		console.log("Databases initialized successfully!");
	} catch (error) {
		console.error("Failed to initialize databases:", error);
		process.exit(1); // Exit the process with an error
	}
}

// Start the server and initialize databases
initializeDatabases().then(() => {
	app.listen(port, () => {
		console.log(`Server running on http://localhost:${port}/`);
	});
});
