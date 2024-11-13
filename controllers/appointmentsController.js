const Appointment = require('../models/Appointment');
exports.getAllAppointments = (req, res) => {
    // Logic to get all appointments
    res.send('List of all appointments');
};

exports.createAppointment = (req, res) => {
    // Logic to create a new appointment
    res.send('Appointment created');
};

exports.bookAppointment = (req, res) => {
    const { doctorEmail, date, time } = req.body;
    const patientEmail = req.session.patientId; // Assuming patientId is stored in session

    const newAppointment = Appointment.bookAppointment(patientEmail, doctorEmail, date, time);
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
};

exports.getUpcomingAppointmentsForPatient = (req, res) => {
    const patientEmail = req.session.patientId; // Assuming patientId is stored in session
    const appointments = Appointment.findAllForPatient(patientEmail);
    res.json(appointments);
};

exports.getUpcomingAppointmentsForDoctor = (req, res) => {
    const doctorEmail = req.session.doctorId; // Assuming doctorId is stored in session
    const appointments = Appointment.findAllForDoctor(doctorEmail);
    res.json(appointments);
};

exports.rescheduleAppointment = (req, res) => {
    const patientEmail = req.session.patientId; // Assuming patientId is stored in session
    const { appointmentId, newDate, newTime } = req.body;

    const updatedAppointment = Appointment.updateAppointment(patientEmail, { date: newDate, time: newTime });
    if (updatedAppointment) {
        res.json({ message: 'Appointment rescheduled successfully', appointment: updatedAppointment });
    } else {
        res.status(404).json({ message: 'Appointment not found' });
    }
};

exports.cancelAppointment = (req, res) => {
    const patientEmail = req.session.patientId; // Assuming patientId is stored in session
    const { appointmentId } = req.body; // Assuming appointmentId is passed in the request body

    const canceled = Appointment.cancelAppointment(patientEmail, appointmentId);
    if (canceled) {
        res.json({ message: 'Appointment canceled successfully' });
    } else {
        res.status(404).json({ message: 'Appointment not found' });
    }
};
