# Hospital Management Website

A **web-based hospital management system** designed to streamline **patient management, staff scheduling, appointment handling, and medical records**. The system efficiently integrates **structured (SQL) and unstructured (NoSQL) data** to ensure secure, scalable, and high-performance healthcare management.  

## Tech Stack

- **Client:** React.js, Tailwind CSS, Daisy UI  
- **Server:** Node.js, Express.js  
- **Database:** MySQL (Relational), MongoDB (Document-based)

## Features

### Patient Management  
- Register and manage patient profiles.  
- Store and retrieve **structured data** (personal details, medical history).  
- Manage **unstructured data** (doctor’s notes, diagnostic images, lab results).  

### Staff Management  
- Manage staff profiles, roles, and schedules.  
- Store **job change history** (title, salary, department).  
- Maintain staff certificates and training records in MongoDB.  

### Appointment Management  
- View doctor schedules (busy/available status).  
- Book, update, and cancel appointments.  
- Prevent scheduling conflicts using transaction management.  

### Reporting & Analytics  
- Generate patient treatment history reports.  
- Track **staff workload and performance** over time.  
- View **billing and financial reports**.  

### Security & Access Control  
- **Role-based Access Control (RBAC)** for data privacy.  
- Secure **staff permissions** (nurses can’t see sensitive patient details, only admins can view reports).  
- Enforced **data integrity** through stored procedures and transactions.  

### Performance Optimizations  
- **Indexing & Partitioning** for efficient query execution.  
- Optimized **query performance** for fast data retrieval.  
- Secure storage of **sensitive information** (encryption & hashed credentials).  

## Quick Start

> Follow these steps to set up the project locally on your machine.

Clone the repository

```bash
git clone https://github.com/tom474/hospital_management_website.git
```

Navigate to the project directory

```bash
cd hospital_management_website
```

Create `.env` file and set up environment variables

```
DB_HOST="localhost"
DB_DATABASE="hospital_database"

DB_USER_ADMIN="admin"
DB_PASS_ADMIN="admin123"

DB_USER_RECEPTIONIST="receptionist"
DB_PASS_RECEPTIONIST="receptionist123"

DB_USER_DOCTOR="doctor"
DB_PASS_DOCTOR="doctor123"

DB_USER_NURSE="nurse"
DB_PASS_NURSE="nurse123"

MONGO_URI="your_mongo_uri"
MONGO_DATABASE_NAME="hospital_database"
```

### MySQL Setup

From the project's root directory, navigate to `database/mysql`

```bash
cd database/mysql
```

Install dependencies

```bash
npm install
```

Initialize the MySQL Database

```bash
npm run setup-with-mock-data
```

### MongoDB Setup

From the project's root directory, navigate to `database/mongodb`

```bash
cd database/mongodb
```

Install dependencies

```bash
npm install
```

### Server Setup

From the project's root directory, navigate to `server`

```bash
cd server
```

Install dependencies

```bash
npm install
```

Start the server
```bash
npm start
```

### Client Setup

From the project's root directory, navigate to `client`

```bash
cd client
```

Install dependencies

```bash
npm install
```

Start the client
```bash
npm run dev
```
