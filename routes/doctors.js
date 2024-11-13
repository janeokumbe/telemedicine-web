const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctorsController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Define routes
router.get('/', doctorsController.getAllDoctors);
router.post('/', doctorsController.createDoctor);
router.post('/', adminMiddleware, doctorsController.addDoctor); // Admin only
router.get('/', doctorsController.getAllDoctors);
router.put('/:email', adminMiddleware, doctorsController.updateDoctor); // Admin only
router.delete('/:email', adminMiddleware, doctorsController.deleteDoctor); // Admin only
// Add more doctor-related routes as needed

module.exports = router;
