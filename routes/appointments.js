const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const authMiddleware = require('../middleware/authMiddleware');
// Define routes
router.get('/', authMiddleware, appointmentsController.getAllAppointments); 
router.post('/', authMiddleware, appointmentsController.createAppointment);
router.post('/', authMiddleware, appointmentsController.bookAppointment); // Book appointment
router.get('/patient', authMiddleware, appointmentsController.getUpcomingAppointmentsForPatient); // Patient's upcoming appointments
router.get('/doctor', authMiddleware, appointmentsController.getUpcomingAppointmentsForDoctor); // Doctor's upcoming appointments
router.put('/reschedule', authMiddleware, appointmentsController.rescheduleAppointment); // Reschedule appointment
router.delete('/cancel', authMiddleware, appointmentsController.cancelAppointment); // Cancel appointment
// Add more appointment-related routes as needed

router.post('/appointments', async (req, res) => {
    const { doctorEmail, date, time } = req.body;
    const patientEmail = req.session.patientId; // Assume patient ID in session

    if (!doctorEmail || !date || !time) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Book the appointment
        const newAppointment = Appointment.bookAppointment(patientEmail, doctorEmail, date, time);
        res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: "Failed to book the appointment. Please try again later." });
    }
});

module.exports = router;
