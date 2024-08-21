const database = require('../models/database');

function assignDatabasePool(req, res, next) {
    const role = req.user.role; // Assume role is set after authentication

    switch (role) {
        case 'admin':
            req.db = database.poolAdmin;
            break;
        case 'receptionist':
            req.db = database.poolReceptionist;
            break;
        case 'doctor':
            req.db = database.poolDoctor;
            break;
        case 'nurse':
            req.db = database.poolNurse;
            break;
        default:
            return res.status(403).json({ message: "Forbidden: Invalid role" });
    }

    next();
}

module.exports = assignDatabasePool;
