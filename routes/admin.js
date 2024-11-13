const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define routes
router.get('/', adminController.getAdminDashboard);
// Add more admin-related routes as needed

module.exports = router;
