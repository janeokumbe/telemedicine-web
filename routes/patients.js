const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patientsController');
const authMiddleware = require('../middleware/authMiddleware');
// Define routes
router.get('/', patientsController.getAllPatients);
router.post('/', patientsController.createPatient);
router.post('/register', patientsController.register);
router.post('/login', patientsController.login);
router.get('/profile', authMiddleware, patientsController.getProfile); 
router.put('/profile', authMiddleware, patientsController.updateProfile); 
router.post('/logout', authMiddleware, patientsController.logout);
router.get('/', authMiddleware, patientsController.getAllPatients); // Admin-only route
router.delete('/delete', authMiddleware, patientsController.deleteAccount); // Delete account route


module.exports = router;
